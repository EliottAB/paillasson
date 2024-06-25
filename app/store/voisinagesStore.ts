import { create } from "zustand";

export interface Voisinage {
  id: string;
  name: string;
  photo: string;
  description: string;
  privacy: 'private' | 'public' | 'demande';
  joined: null | Date;
  requested: null | Date;
  lastMessage: {user: null | string; message: null | string; date: null | Date};
  users: {photo: string; name: string}[];
}

interface VoisinageStore {
  voisinages: Voisinage[];
  userVoisinages: Voisinage[];
}

const mockVoisinages: Voisinage[] = [
  {
    id: 'c36dfg',
    name: 'Quartier pilleur',
    photo: '/assets/logo.png',
    description: 'Super voisinage !',
    privacy: 'demande',
    joined: null,
    requested: new Date('2024-01-01'),
    lastMessage: {user: null, message: null, date: null},
    users: [],
  },
  {
    id: 'c36dfg',
    name: 'Planche brûlée',
    photo: '/assets/pdcjC7Vz.jpg',
    description: 'Super voisinage !',
    privacy: 'private',
    joined: new Date('2022-01-01'),
    requested: new Date('2022-01-01'),
    lastMessage: {user: 'Gerard Depou', message: "c'est quoi le code de la barrière ?", date: new Date('2022-01-01T09:43:00Z')},
    users: [
      {photo: '/assets/pdcjC7Vz.jpg', name: "Bernard soches"},
      {photo: '/assets/pdcjC7Vz.jpg', name: "Bernard soches"},
    ],
  },
  {
    id: 'c36dfg',
    name: 'La canne foncière',
    photo: '/assets/logo.png',
    description: 'Super voisinage !',
    privacy: 'demande',
    joined: new Date('2024-02-01'),
    requested: new Date('2024-01-01'),
    lastMessage: {user: 'Gerard Depou', message: "Jerem sale poulet", date: new Date('2022-01-01T09:43:00Z')},
    users: [
      {photo: '/assets/pdcjC7Vz.jpg', name: "Bernard soches"},
      {photo: '/assets/pdcjC7Vz.jpg', name: "Bernard soches"},
      {photo: '/assets/pdcjC7Vz.jpg', name: "Bernard soches"},
      {photo: '/assets/pdcjC7Vz.jpg', name: "Bernard soches"},
      {photo: '/assets/pdcjC7Vz.jpg', name: "Bernard soches"},
    ],
  },
  {
    id: 'c36dfg',
    name: 'Ferney',
    photo: '/assets/3_humans.svg',
    description: 'Super voisinage !',
    privacy: 'public',
    joined: null,
    requested: null,
    lastMessage: {user: null, message: null, date: null},
    users: [],
  },
  {
    id: 'c36dfg',
    name: 'demandage',
    photo: '/assets/logo.png',
    description: 'Super voisinage !',
    privacy: 'demande',
    joined: null,
    requested: null,
    lastMessage: {user: null, message: null, date: null},
    users: [],
  }
]

export const voisinageStore = create<VoisinageStore>((set) => ({
  voisinages: mockVoisinages,
  userVoisinages: mockVoisinages,
}));