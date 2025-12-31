import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { getToken, loginUser, logout as apiLogout, registerUser, confirmEmail } from "@/api/authservice";
import { useRouter } from "expo-router";

interface AuthContextProps {
  token: string | null;
  userEmail: string | null;
  userName: string | null;
  isLogged: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<Result<void>>;
  register: (email: string, password: string, confirmPassword: string) => Promise<Result<void>>;
  confirmUserEmail: (email: string, code: string) => Promise<Result<void>>;
  logout: () => Promise<void>;
}
export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; code?: string };

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Sprawdź token w AsyncStorage przy starcie aplikacji
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = await getToken();
      if (savedToken) {
        setToken(savedToken);
        // Możesz też pobrać info o użytkowniku z API, jeśli chcesz
        setUserEmail("…"); // przykładowe placeholdery
        setUserName("…");
      }
      setLoading(false);
    };
    initAuth();
  }, []);
  
  const login = async (email: string, password: string): Promise<Result<void>> => {
    try {
      const res = await loginUser({ email, password });
      setToken(res.token);
      setUserEmail(res.email);
      setUserName(res.userName);
      router.replace("/home");

      return { ok: true, data: undefined };
    } catch (err: any) {
      console.log("LOGIN ERROR", err?.response?.data || err);
      return {
        ok: false,
        message: err?.response?.data?.message || "Login failed",
        code: err?.response?.data?.code,
      };
    }
  };
  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<Result<void>> => {
    try {
      const res = await registerUser({ email, password, confirmPassword });

      setUserEmail(email);

      return { ok: true, data: undefined };
    } catch (err: any) {
      console.log("REGISTER ERROR", err?.response?.data || err);
      return {
        ok: false,
        message: err?.response?.data?.message || "Registration failed",
        code: err?.response?.data?.code,
      };
    }
  };

  const confirmUserEmail = async (
    email: string,
    code: string
  ): Promise<Result<void>> => {
    try {
      const jwtToken = await confirmEmail(email, code);

      setToken(jwtToken);
      setUserEmail(email);
      setUserName(email);
      router.replace("/home");

      return { ok: true, data: undefined };
    } catch (err: any) {
      console.log("CONFIRM ERROR", err?.response?.data || err);
      return {
        ok: false,
        message: err?.response?.data?.message || "Confirmation failed",
        code: err?.response?.data?.code,
      };
    }
  };

  const logout = async () => {
    await apiLogout();
    setToken(null);
    setUserEmail(null);
    setUserName(null);
    router.replace("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userEmail,
        userName,
        isLogged: !!token,
        loading,
        login,
        register,
        confirmUserEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
