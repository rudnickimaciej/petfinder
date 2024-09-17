// src/types/pet.ts

export type Pet = {
    id: number;
    name: string;
    date: string;
    address: string;
    image: any
  };
  
  export interface PetOnMap {
    id: string;
    name: string;
    lat: number;
    lng: number;
    image: string;
    type: 'dog' | 'cat';
    description: string;
    lastSeenDate: string;
  }