import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  firstname: string;
  geoLocation: [number, number];
}

export const userStore = create<{ user: User }>((set) => ({
  user: {} as User,
}));