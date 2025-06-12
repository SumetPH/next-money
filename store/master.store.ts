import { create } from "zustand";

type State = {
  accountType: { value: string; text: string }[];
};

export const useMasterStore = create<State>(() => ({
  accountType: [
    { value: "cash", text: "เงินสด" },
    { value: "bank", text: "ธนาคาร" },
    { value: "credit", text: "เครดิต" },
    { value: "saving", text: "เงินเก็บ" },
    { value: "debt", text: "หนี้สิน" },
  ],
}));
