import { create } from "zustand";

export const userStore = create((set) => ({
  user: {} as {email: string | undefined, firstname: string | undefined},
}));