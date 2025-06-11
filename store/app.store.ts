import { create } from "zustand";

type State = {
  pageTitle: string;
  setPageTitle: (title: string) => void;
};

export const useAppStore = create<State>((set) => ({
  pageTitle: "",
  setPageTitle: (title) => set({ pageTitle: title }),
}));
