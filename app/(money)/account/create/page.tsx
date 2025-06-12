"use client";

import AccountForm from "@/components/app/account/account-form";

export default function AccountCreate() {
  return (
    <div className="p-5">
      <AccountForm mode="create" />
    </div>
  );
}
