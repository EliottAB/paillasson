import { create } from "zustand";

export interface Voisinage {
  name: string;
  photo: string;
  description: string;
  privacy: 'private' | 'public' | 'demande';
  joined: null | Date;
  requested: null | Date;
}

interface VoisinageStore {
  voisinages: Voisinage[];
  userVoisinages: Voisinage[];
}

const mockVoisinages: Voisinage[] = [
  {
    name: 'Quartier pilleur',
    photo: '/assets/logo.png',
    description: 'Super voisinage !',
    privacy: 'demande',
    joined: null,
    requested: new Date('2024-01-01')
  },
  {
    name: 'Planche brûlée',
    photo: '/assets/logo.png',
    description: 'Super voisinage !',
    privacy: 'private',
    joined: new Date('2022-01-01'),
    requested: new Date('2022-01-01'),
  },
  {
    name: 'La canne foncière',
    photo: '/assets/logo.png',
    description: 'Super voisinage !',
    privacy: 'demande',
    joined: new Date('2024-02-01'),
    requested: new Date('2024-01-01')
  },
  {
    name: 'Ferney',
    photo: '/assets/logo.png',
    description: 'Super voisinage !',
    privacy: 'public',
    joined: null,
    requested: null
  },
  {
    name: 'demandage',
    photo: '/assets/logo.png',
    description: 'Super voisinage !',
    privacy: 'demande',
    joined: null,
    requested: null
  }
]

export const voisinageStore = create<VoisinageStore>((set) => ({
  voisinages: mockVoisinages,
  userVoisinages: mockVoisinages,
}));