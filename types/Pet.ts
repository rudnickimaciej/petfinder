// src/types/pet.ts

import { User } from "./User";

export type Pet = {
    id: number;
    breed: string,
    date: string;
    location: string;
    images: any[],
    sex: string,
    age: string,
    temper: string,
    story: string, 
    user: User
  };

export type FoundPet = Pet & {
  type: 'found'
};

export type MissingPet = Pet & {
  name: string;
  type: 'missing'
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