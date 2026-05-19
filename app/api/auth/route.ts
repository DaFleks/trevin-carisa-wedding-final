import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { password } = await req.json();

  const store = await prisma.auth.findFirst();
  if (!store) return NextResponse.json({ message: "Auth store not found.", status: 500 });

  const isValid = await bcrypt.compare(password, store.hashedPassword);
  if (!isValid) return NextResponse.json({ message: "Wrong password mf." });

  const session = await prisma.session.create({ data: { expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) } });

  (await cookies()).set("session_id", session.id, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ message: "Logged In!", status: 201 });
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies();
  const session_id = cookieStore.get("session_id")?.value;

  if (!session_id) return NextResponse.json({ message: "You are already logged out." });

  try {
    await prisma.session.delete({ where: { id: session_id } });
    cookieStore.delete("session_id");
  } catch (error) {
    return NextResponse.json({ message: "There was an error." });
  }

  return NextResponse.json({ message: "Logged Out.", status: 204 });
}
