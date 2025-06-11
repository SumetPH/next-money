"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFetchAccount from "@/hooks/use-fetch-account";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app.store";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import numeral from "numeral";

export default function Account() {
  const { setPageTitle } = useAppStore();

  const accounts = useFetchAccount();

  useEffect(() => {
    setPageTitle("บัญชี");
  }, [setPageTitle]);

  if (accounts.data) {
    return (
      <div>
        {...accounts.data.map((account, index) => (
          <div key={index}>
            <section className="flex justify-between text-sm font-bold bg-stone-800 py-2 px-4">
              <span>{account.title}</span>
              <span
                className={cn(
                  Number(account.balance) === 0 && "text-white",
                  Number(account.balance) > 0 && "text-green-600",
                  Number(account.balance) < 0 && "text-red-600"
                )}
              >
                {numeral(account.balance).format("0,0.00")} บาท
              </span>
            </section>

            {...account.list.map((list, i) => (
              <section
                key={i}
                className="flex justify-between items-center px-4 py-2 bg-stone-900"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <section>
                    <section>{list.title}</section>
                    <section
                      className={cn(
                        "font-bold",
                        Number(list.balance) === 0 && "text-white",
                        Number(list.balance) > 0 && "text-green-600",
                        Number(list.balance) < 0 && "text-red-600"
                      )}
                    >
                      {numeral(list.balance).format("0,0.00")} บาท
                    </section>
                  </section>
                </div>
                <ChevronRight />
              </section>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
