import { create } from "zustand";

interface CategoryStoreState {
  activeId: number;
  setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<CategoryStoreState>()((set) => ({
  activeId: 1,
  setActiveId: (activeId: number) => set({ activeId }),
}));
