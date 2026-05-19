"use client";

import Container from "../aetherium/Container";
import Link from "next/link";
import { Button } from "../ui/button";
import SignOutButton from "../SignOutButton";

const Sidebar = () => {
  return (
    <Container className="w-64 bg-neutral-200 p-4 border-r  space-y-8">
      <ul className="space-y-4 font-medium size-full relative">
        <li>
          <Button className="bg-slate-600 hover:bg-slate-600/90" asChild>
            <Link href="/invitations">Invite List</Link>
          </Button>
        </li>
        <li>
          <Button className="bg-slate-600 hover:bg-slate-600/90" asChild>
            <Link href="/invitations/add">Add New Invitation</Link>
          </Button>
        </li>
        <li className="absolute bottom-0 w-full">
          <SignOutButton />
        </li>
      </ul>
    </Container>
  );
};

export default Sidebar;
