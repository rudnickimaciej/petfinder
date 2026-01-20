import { api } from "./api";

export type MeResponse = {
  id: string;
  email: string;
  avatarUrl: string | null;
  registrationDate: string | null;
  lastLoginTime: string | null;
};

export async function getMe(): Promise<MeResponse> {
  const res = await api.get<MeResponse>("/users/me");
  return res.data;
}
export type UserProfileResponse = {
  id: string;
  name: string;
  avatarUrl: string | null;
};

export async function getUserProfile(id: string): Promise<UserProfileResponse> {
  const res = await api.get<UserProfileResponse>(`/users/${id}/public-profile`)
  return res.data;
}
