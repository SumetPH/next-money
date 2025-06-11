import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetcher<T>(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: T = await res.json();
  return data;
}
