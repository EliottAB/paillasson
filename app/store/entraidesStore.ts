import { create } from "zustand";

export interface Entraide {
  title: string;
  photo: string;
  description: string;
  createdAt: Date;
  type: 'pet' | 'event' | 'other' | 'sondage';
  voisinageName: string;
  voisinageId: string;
  voisinagePhoto: string;
  creatorName: string;
  creatorPhoto: string;
}

interface EntraidesStore {
  entraides: Entraide[];
}

const mockEntraides: Entraide[] = [
  {
    title: 'Pedro perdu',
    photo: '/assets/wallpaperflare-cropped.jpg',
    description: 'Pedro sest perdu dans le quartier west de la ville. Il aime manger des croquettes mais on ne sait pas du tout où il a pu aller ni même pourquoi il est parti ni quand en fait on le connait même pas',
    createdAt: new Date('2022-01-01'),
    type: 'pet',
    voisinageName: 'Quartier pilleur',
    voisinageId: '1',
    voisinagePhoto: '/assets/pdcjC7Vz.jpg',
    creatorName: 'Eliott',
    creatorPhoto: '/assets/logo.png',
  },
  {
    title: 'Mamie dans les orties',
    photo: '/assets/wallpaperflare-cropped.jpg',
    description: 'Super entraide !',
    createdAt: new Date('2022-01-01'),
    type: 'event',
    voisinageName: 'Planche brùlée',
    voisinageId: '2',
    voisinagePhoto: '/assets/pdcjC7Vz.jpg',
    creatorName: 'Eliott',
    creatorPhoto: '/assets/logo.png',
  },
  {
    title: 'Fète des voisins',
    photo: '/assets/wallpaperflare-cropped.jpg',
    description: 'Super entraide !',
    createdAt: new Date('2022-01-01'),
    type: 'event',
    voisinageName: 'La canne foncière',
    voisinageId: '3',
    voisinagePhoto: '/assets/pdcjC7Vz.jpg',
    creatorName: 'Eliott',
    creatorPhoto: '/assets/logo.png',
  },
  {
    title: 'Ferney',
    photo: '/assets/wallpaperflare-cropped.jpg',
    description: 'Super entraide !',
    createdAt: new Date('2022-01-01'),
    type: 'other',
    voisinageName: 'Ferney',
    voisinageId: '4',
    voisinagePhoto: '/assets/pdcjC7Vz.jpg',
    creatorName: 'Eliott',
    creatorPhoto: '/assets/logo.png',
  },
]

export const entraidesStore = create<EntraidesStore>((set) => ({
  entraides: mockEntraides,
}));