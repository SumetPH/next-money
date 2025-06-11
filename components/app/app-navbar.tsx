"use client";

import { useAppStore } from "@/store/app.store";
import { SidebarTrigger } from "../ui/sidebar";

export default function AppNavbar() {
  const appStore = useAppStore();

  return (
    <div className="bg-zinc-900 p-3 grid grid-cols-3">
      <SidebarTrigger />
      <section className="text-center font-bold">{appStore.pageTitle}</section>
      <section></section>
    </div>
  );
}
