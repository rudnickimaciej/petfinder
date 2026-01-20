// src/types/pet.ts

import { User } from "./User";

export type Post = {
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
export type PostPreview = {
  id: string;
  name: string;          
  breed: string;
  date: string;         
  location?: Location;
  mainImage?: any;       
  sex?: string;
  age?: string;
  animalType?: string;
  postType: PostType  
};

export type FoundPPost = Post & {
  type: 'found'
};

export type MissingPost = Post & {
  name: string;
  type: 'missing'
 };


export type Location = {
  name?: string; // opcjonalny adres/nazwa miejsca
  coords?: {     // współrzędne, jeśli użytkownik zaznaczył na mapie
    latitude: number;
    longitude: number;
  };
};
  export interface PostOnMap {
    id: string;
    name: string;
    lat: number;
    lng: number;
    image: string;
    type: 'dog' | 'cat';
    description: string;
    lastSeenDate: string;
  }
  export enum PostType {
    Missing, 
    Found
  }

  export type MissingPetDetails = {
  id: string;
  name: string;
  description?: string;
  gender?: string;
  age?: number;

  animalType: string;
  breedId?: string;

  missingDate: string;
  createdAt: string;

  lastSeenPlaceDescription?: string;
  lastSeenLatitude?: number;
  lastSeenLongitude?: number;

  photos: string[];
  ownerId: string;
  owner?: {
    name: string;
    avatarUrl?: string;
  };
};