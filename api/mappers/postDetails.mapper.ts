import { MissingPetDetails } from "@/types/Post";
import { MissingPetDetailsResponse } from "../post.service";

export const mapMissingPetDetailsResponse = (
  response: MissingPetDetailsResponse
): MissingPetDetails => ({
  id: response.id,
  name: response.name,
  description: response.description,
  gender: response.gender,

  // backend nie zwraca age → zostawiamy undefined
  age: undefined,

  animalType: response.animalType,
  breedId: response.breedId,

  missingDate: response.missingDate,
  createdAt: response.createdOn,

  lastSeenPlaceDescription: response.lastSeenPlaceDescription,
  lastSeenLatitude: response.lastSeenLatitude,
  lastSeenLongitude: response.lastSeenLongitude,

  photos: response.photos,
  ownerId: response.ownerId,
  owner: response.owner
    ? {
        name: response.owner.name,
        avatarUrl: response.owner.avatarUrl,
      }
    : undefined,
});

export default mapMissingPetDetailsResponse;
