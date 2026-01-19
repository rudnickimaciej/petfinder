import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ConfirmCodeResponse {
  status: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userName: string;
  email: string;
}

export async function registerUser(data: RegisterRequest): Promise<void> {
  await api.post("/auth/register", data);
}

export async function confirmEmail(email: string, code: string): Promise<ConfirmCodeResponse> {
  const result = await api.post<ConfirmCodeResponse>("/auth/confirm-code", { email, code });
  return result.data;
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/login", data);

  const token = res.data.token;
  if (!token) throw new Error("Invalid login response");

  await AsyncStorage.setItem("auth_token", token);
  return res.data;
}

export async function logout() {
  await AsyncStorage.removeItem("auth_token");
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem("auth_token");
}
