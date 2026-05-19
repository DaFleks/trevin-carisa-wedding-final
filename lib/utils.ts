import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithLoading(handleIsLoading: () => void, input: string, init?: RequestInit | undefined) {
  handleIsLoading();
  const response = await fetch(input, init);
  const data = await response.json();
  handleIsLoading();
  return data;
}

export function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
