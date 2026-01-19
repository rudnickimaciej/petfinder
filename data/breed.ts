import { AnimalType } from "@/types/AnimalType";
import { Breed } from "@/types/Bred";

export const BREEDS: Record<AnimalType, Breed[]> = {
  dog: [
    {
      id: 'd23d3534-7ccd-461f-bde4-d864bfb18479',
      name: 'Labrador Retriever',
      image: 'https://findpet.blob.core.windows.net/breed/australian-shepherd.png',
    },
    {
      id: '1f50ffc2-5492-4687-833f-54b14f6e1e6a',
      name: 'Beagle',
      image: 'https://findpet.blob.core.windows.net/breed/basset-hound.png',
    },
    {
      id: 'c3b87a39-7b6f-4f8b-9e9b-9a4fdcc5f9f1',
      name: 'Border Collie',
      image: 'https://findpet.blob.core.windows.net/breed/bichon-frise.png',
    },
    {
      id: '7b4c4a63-71d0-4df0-9d0b-9c9c90b5d2c4',
      name: 'Bulldog',
      image: 'https://findpet.blob.core.windows.net/breed/chihuahua.png',
    },
    {
      id: 'e98cbb8f-7bb4-4d8a-9c89-9f3f6e5bb111',
      name: 'Chihuahua',
      image: 'https://findpet.blob.core.windows.net/breed/dachshund.png',
    },
    {
      id: 'bc67a1de-4a7e-4e44-9b1d-63a3c8a7f992',
      name: 'German Shepherd',
      image: 'https://placedog.net/200/200?id=6',
    },
    {
      id: 'f1a8e6b2-9f2e-4cb7-9df2-1a5b71c8cabc',
      name: 'Golden Retriever',
      image: 'https://placedog.net/200/200?id=7',
    },
    {
      id: 'a4d1fa35-73e7-4a94-9f9b-bc2d31b6c221',
      name: 'Poodle',
      image: 'https://placedog.net/200/200?id=8',
    },
    {
      id: '8b4a9b9e-fb92-4d5b-9a01-2c74d99c0e55',
      name: 'Rottweiler',
      image: 'https://placedog.net/200/200?id=9',
    },
    {
      id: '6e7f25b1-b4a5-4d1b-b12f-98b2eac7f777',
      name: 'Yorkshire Terrier',
      image: 'https://placedog.net/200/200?id=10',
    },
  ],

  cat: [
    {
      id: '5108cb73-d4bf-413a-921e-18ba3a91b545',
      name: 'Maine Coon',
      image: 'https://placekitten.com/200/200',
    },
    {
      id: '730b2f95-a1ee-4a9b-87b2-8c691cc3ed03',
      name: 'Bengal',
      image: 'https://placekitten.com/201/200',
    },
    {
      id: 'e3c6d5a4-9f89-4dcb-9b3c-3f4b5a1c2222',
      name: 'British Shorthair',
      image: 'https://placekitten.com/202/200',
    },
    {
      id: 'a92b7c5e-6c71-4d3a-b8f9-2b8d9e0c3333',
      name: 'Persian',
      image: 'https://placekitten.com/203/200',
    },
    {
      id: 'bb82dfe3-8f3a-4f4b-9c91-4c9e8b1d4444',
      name: 'Ragdoll',
      image: 'https://placekitten.com/204/200',
    },
    {
      id: 'c44fbd7e-5e8a-4a61-8b5c-5a8c9d2e5555',
      name: 'Scottish Fold',
      image: 'https://placekitten.com/205/200',
    },
    {
      id: 'd1f2a8e9-4c3b-4f77-9d9c-6f8a9b3c6666',
      name: 'Siamese',
      image: 'https://placekitten.com/206/200',
    },
    {
      id: 'e7b9c3a4-5d6e-4c9a-9b1f-7a8b9c4d7777',
      name: 'Sphynx',
      image: 'https://placekitten.com/207/200',
    },
  ],
};
