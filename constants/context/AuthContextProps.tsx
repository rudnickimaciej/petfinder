import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";

import {
  getToken,
  loginUser,
  logout as apiLogout,
  registerUser,
  confirmEmail,
} from "@/api/auth.service";

import { getMe, MeResponse } from "@/api/user.service";

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; code?: string };

interface AuthContextProps {
  token: string | null;

  // to jest już prawdziwy profil z backendu:
  me: MeResponse | null;

  // kompatybilność wstecz (żeby nie zmieniać całej appki naraz)
  userEmail: string | null;
  userName: string | null;

  isLogged: boolean;
  loading: boolean;

  refreshMe: () => Promise<void>;

  login: (email: string, password: string) => Promise<Result<void>>;
  register: (email: string, password: string, confirmPassword: string) => Promise<Result<void>>;
  confirmUserEmail: (email: string, code: string) => Promise<Result<void>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Pobiera profil /api/users/me na podstawie tokena z AsyncStorage.
   * Jeśli token jest nieważny albo backend zwróci 401 -> czyścimy stan.
   */
  const refreshMe = async () => {
    const savedToken = await getToken();

    if (!savedToken) {
      setToken(null);
      setMe(null);
      return;
    }

    setToken(savedToken);

    try {
      const profile = await getMe();
      setMe(profile);
    } catch (err: any) {
      // 401 / token expired / backend down
      console.log("GETME ERROR", err?.response?.data || err);
      setToken(null);
      setMe(null);
      await apiLogout();
    }
  };

  // init po starcie aplikacji
  useEffect(() => {
    const initAuth = async () => {
      await refreshMe();
      setLoading(false);
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string): Promise<Result<void>> => {
    try {
      // login zapisuje token w AsyncStorage (u Ciebie to już jest)
      const res = await loginUser({ email, password });
      setToken(res.token);

      // po loginie pobieramy profil (me)
      await refreshMe();

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
      await registerUser({ email, password, confirmPassword });
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

  const confirmUserEmail = async (email: string, code: string): Promise<Result<void>> => {
    try {
      await confirmEmail(email, code);
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
    setMe(null);
    router.replace("/sign-in");
  };

  const value = useMemo<AuthContextProps>(
    () => ({
      token,
      me,

      // kompatybilność: jak jeszcze używasz tego w UI
      userEmail: me?.email ?? null,
      userName: me?.email?.split("@")[0] ?? null, // jeśli nie masz DisplayName w API

      isLogged: !!token && !!me, // token + faktycznie działa /users/me
      loading,

      refreshMe,
      login,
      register,
      confirmUserEmail,
      logout,
    }),
    [token, me, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
