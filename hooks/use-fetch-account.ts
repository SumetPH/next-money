import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export interface Account {
  id: number;
  title: string;
  created_at: string;
  updated_at: string | null;
  type: string;
  credit_date: number | null;
  is_hidden: boolean;
  balance: string;
}

export function useFetchAccount(id: string) {
  return useSWR<Account>(
    `${process.env.NEXT_PUBLIC_API}/api/account/${id}`,
    fetcher
  );
}
