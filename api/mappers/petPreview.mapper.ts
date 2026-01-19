import { PostPreview, PostType } from "@/types/Post";

export const mapMissingPetToPostPreview = (
  item: {
    id: string;
    name: string;
    date: Date;
    animalType: string;
    breedId?: string;
    gender?: string;
    missingDate: string;
    lastSeenLatitude?: number;
    lastSeenLongitude?: number;
    lastSeenPlaceDescription?: string;
    mainPhotoUrl: string;
  }
): PostPreview => ({
  id: item.id,
  name: item.name,
  breed: item.breedId ?? 'Nieznana',
  date: item.date?.toString() ?? item.missingDate,

  postType: PostType.Missing, // 🔴 ważne – to endpoint missingpets

  animalType: item.animalType,
  sex: item.gender,
  age: undefined, // ❗ API nie zwraca wieku w search

  mainImage: item.mainPhotoUrl,

  location:
    item.lastSeenLatitude != null && item.lastSeenLongitude != null
      ? {
          name: item.lastSeenPlaceDescription,
          coords: {
            latitude: item.lastSeenLatitude,
            longitude: item.lastSeenLongitude,
          },
        }
      : undefined,
});

export default mapMissingPetToPostPreview;