import { Platform } from "react-native";
import { API_BASE } from "@env";

const API_URL = `${API_BASE}/missingpets`; 

interface MissingPetRequest {
  animalType: string;
  name: string;
  age: number;
  description: string;
  breed: string;
  photos: Array<{ uri: string; name?: string; type?: string }>;
  lastSeenDate: Date;
  location: { latitude: number; longitude: number };
}
interface MissingPetSearchRequest {
  animalType?: string;
  breedId?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  page?: number;
  pageSize?: number;
}

interface MissingPetSearchResponse {
  items: Array<{
    id: string;
    name: string;
    description?: string;
    date: Date;
    gender?: string;
    missingDate: string;
    animalType: string;
    breedId?: string;
    lastSeenLatitude?: number;
    lastSeenLongitude?: number;
    lastSeenPlaceDescription?: string;
    mainPhotoUrl: string;
  }>;
  totalCount: number;
  page: number;
  pageSize: number;
}
export interface MissingPetDetailsResponse {
  id: string;
  name: string;
  description?: string;
  createdOn: string;
  missingDate: string;
  animalType: string;
  breedId?: string;
  gender?: string;
  age?: number;
  lastSeenLatitude?: number;
  lastSeenLongitude?: number;
  lastSeenPlaceDescription?: string;
  photos: string[]; // URL-e
  owner?: {
    name: string;
    avatarUrl?: string;
  };
}
class PostService {

  async publishMissingPetPost(data: MissingPetRequest, token: string|null) {
    const formData = new FormData();

    formData.append("AnimalType", data.animalType);
    formData.append("Status", "published");
    formData.append("Name", data.name);
    formData.append("Age", data.age.toString());
    formData.append("Description", data.description);
    formData.append("BreadId", data.breed);
    formData.append("LastSeenDate", data.lastSeenDate.toISOString());
    formData.append("LastSeenLatitude", data.location.latitude.toString());
    formData.append("LastSeenLongitude", data.location.longitude.toString());

    data.photos.forEach((photo, index) => {
      let uri = Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri;
      formData.append("Photos", {
        uri,
        name: photo.name || `photo_${index}.jpg`,
        type: photo.type || "image/jpeg",
      } as any);
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to create missing pet: ${text}`);
    }

    return await response.json();
  }
  async draftMissingPetPost(data: MissingPetRequest, token: string|null) {
    const formData = new FormData();

    formData.append("AnimalType", data.animalType);
    formData.append("Status", "draft");
    formData.append("Name", data.name);
    formData.append("Age", data.age.toString());
    formData.append("Description", data.description);
    formData.append("BreadId", data.breed);
    formData.append("LastSeenDate", data.lastSeenDate?.toISOString());
    formData.append("LastSeenLatitude", data.location?.latitude.toString());
    formData.append("LastSeenLongitude", data.location?.longitude?.toString());

    data.photos.forEach((photo, index) => {
      let uri = Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri;
      formData.append("Photos", {
        uri,
        name: photo.name || `photo_${index}.jpg`,
        type: photo.type || "image/jpeg",
      } as any);
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to create missing pet: ${text}`);
    }

    return await response.json();
  }

  async searchMissingPets(
    filters: MissingPetSearchRequest,
    token: string | null
  ): Promise<MissingPetSearchResponse> {
    const params = new URLSearchParams();
    if (filters.animalType) params.append("animalType", filters.animalType);
    if (filters.breedId) params.append("breedId", filters.breedId);
    if (filters.latitude !== undefined) params.append("latitude", filters.latitude.toString());
    if (filters.longitude !== undefined) params.append("longitude", filters.longitude.toString());
    if (filters.radiusKm !== undefined) params.append("radiusKm", filters.radiusKm.toString());
    params.append("page", (filters.page ?? 1).toString());
    params.append("pageSize", (filters.pageSize ?? 20).toString());

    const url = `${API_URL}?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to search missing pets: ${text}`);
    }

    return await response.json();
  }

  async getMissingPetById(
  id: string,
  token: string | null
): Promise<MissingPetDetailsResponse> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch missing pet: ${text}`);
  }

  return await response.json();
}

}


export default new PostService();
