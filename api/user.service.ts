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
