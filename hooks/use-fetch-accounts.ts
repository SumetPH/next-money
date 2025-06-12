import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export interface Account {
  title: string;
  balance: string;
  list: AccountList[];
}

export interface AccountList {
  id: number;
  title: string;
  created_at: string;
  updated_at: null;
  type: string;
  credit_date: number | null;
  is_hidden: boolean;
  balance: string;
}

export function useFetchAccounts() {
  return useSWR<Account[]>(
    `${process.env.NEXT_PUBLIC_API}/api/account`,
    fetcher
  );
}
