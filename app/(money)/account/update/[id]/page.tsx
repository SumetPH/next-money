"use client";

import AccountForm from "@/components/app/account/account-form";
import { useFetchAccount } from "@/hooks/use-fetch-account";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

export default function AccountUpdate() {
  const { id } = useParams();

  const account = useFetchAccount(String(id));

  if (account.data) {
    return (
      <div className="p-5">
        <AccountForm
          mode="update"
          id={account.data.id}
          defaultValues={{
            title: account.data.title,
            type: account.data.type,
            credit_date: account.data.credit_date
              ? String(account.data.credit_date)
              : undefined,
            created_at: dayjs(account.data.created_at).toDate(),
            is_hidden: account.data.is_hidden,
          }}
        />
      </div>
    );
  }
}
