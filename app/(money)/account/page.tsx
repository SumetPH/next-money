"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app.store";
import { ChevronRight, MoreVertical } from "lucide-react";
import { useEffect } from "react";
import numeral from "numeral";
import { useFetchAccounts } from "@/hooks/use-fetch-accounts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Account() {
  const router = useRouter();
  const { setPageTitle } = useAppStore();

  const accounts = useFetchAccounts();

  useEffect(() => {
    setPageTitle("บัญชี");
  }, [setPageTitle]);

  async function deleteAccount(id: number) {
    try {
      toast("กําลังลบบัญชี");
      await fetch(`${process.env.NEXT_PUBLIC_API}/api/account/${id}`, {
        method: "DELETE",
      });
      accounts.mutate();
      toast("ลบบัญชีสําเร็จ");
    } catch (error) {
      console.error(error);
      toast("ลบบัญชีไม่สําเร็จ");
    }
  }

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
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/account/update/${list.id}`)
                        }
                      >
                        แก้ไขบัญชี
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteAccount(list.id)}>
                        ลบบัญชี
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
