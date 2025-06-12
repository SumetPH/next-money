"use client";

import { useAppStore } from "@/store/app.store";
import { useSidebar } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function AppNavbar() {
  const { toggleSidebar } = useSidebar();
  const appStore = useAppStore();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="bg-zinc-900 p-3 grid grid-cols-3 sticky top-0 z-50">
        <section>
          <Menu onClick={toggleSidebar} />
        </section>
        <section className="text-center font-bold">
          <span>{appStore.pageTitle}</span>
        </section>
        <section className="flex justify-end items-center">
          {pathname === "/account" && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>เมนู</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/account/create")}
                >
                  สร้างบัญชี
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </section>
      </div>
    </>
  );
}
