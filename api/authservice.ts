import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = "https://nanette-preornamental-jarrod.ngrok-free.dev/api/auth"; // Twój backend API

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Typy requestów i odpowiedzi
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ConfirmEmailRequest {
  email: string;
  code: string; // lub token, zależnie od API
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

// Rejestracja użytkownika (wysyła e-mail z kodem)
export async function registerUser(data: RegisterRequest): Promise<void> {
  await api.post("/register", data);
}

// Potwierdzenie e-maila, backend zwraca token JWT
export async function confirmEmail(
  email: string,
  code: string
): Promise<string> {
  const res = await api.post<AuthResponse>("/confirm-code", { email, code });
  const token = res.data.token;

  if (!token) throw new Error("Token not returned from server");

  // Zapisz token w AsyncStorage
  await saveToken(token);

  return token;
}

// Logowanie użytkownika
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/login", data);
  const token = res.data.token;

  if (!token) throw new Error("Invalid login response");

  // Zapisz token w AsyncStorage
  await saveToken(token);

  return res.data;
}

// Zapis tokena w AsyncStorage
export async function saveToken(token: string) {
  await AsyncStorage.setItem("auth_token", token);
}

// Pobierz token z AsyncStorage
export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem("auth_token");
}

// Wylogowanie użytkownika
export async function logout() {
  await AsyncStorage.removeItem("auth_token");
}
