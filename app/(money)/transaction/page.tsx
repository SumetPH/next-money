"use client";

import { useAppStore } from "@/store/app.store";
import { useEffect } from "react";

export default function Transaction() {
  const { setPageTitle } = useAppStore();

  useEffect(() => {
    setPageTitle("รายการ");
  }, [setPageTitle]);

  return (
    <div>
      <h1>transaction</h1>
    </div>
  );
}
