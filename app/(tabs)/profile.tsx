import React, { useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/constants/context/AuthContextProps";
import SettingsList, { SettingsSection } from "@/components/settings/SettingsList";

export default function ProfilePage() {
  const router = useRouter();
  const { logout, me } = useAuth();

  const sections: SettingsSection[] = useMemo(
    () => [
      {
        key: "reports",
        title: "Zgłoszenia",
        items: [
          {
            key: "my-reports",
            title: "Moje zgłoszenia",
            icon: <Ionicons name="paw-outline" size={20} color="#111827" />,
            onPress: () => router.push("/profile/my-reports"),
          },
          {
            key: "history",
            title: "Historia",
            icon: <MaterialIcons name="history" size={20} color="#111827" />,
            onPress: () => router.push("/profile/history"),
          },
          {
            key: "favorites",
            title: "Ulubione",
            icon: <Ionicons name="heart-outline" size={20} color="#111827" />,
            onPress: () => router.push("/profile/favorites"),
          },
        ],
      },
      {
        key: "community",
        title: "Społeczność",
        items: [
          {
            key: "invite",
            title: "Zaproś znajomych",
            icon: <Ionicons name="person-add-outline" size={20} color="#111827" />,
            onPress: () => router.push("/profile/invite"),
          },
          {
            key: "promo",
            title: "Narzędzia promocyjne",
            icon: <Ionicons name="megaphone-outline" size={20} color="#111827" />,
            onPress: () => router.push("/profile/promo"),
          },
        ],
      },
      {
        key: "settings",
        title: "Ustawienia",
        items: [
          {
            key: "personalization",
            title: "Personalizacja",
            icon: <Ionicons name="options-outline" size={20} color="#111827" />,
            onPress: () => router.push("/profile/personalization"),
          },
          {
            key: "notifications",
            title: "Powiadomienia",
            icon: <Ionicons name="notifications-outline" size={20} color="#111827" />,
            onPress: () => router.push("/profile/notifications"),
          },
        ],
      },
      {
        key: "security",
        title: "Bezpieczeństwo",
        items: [
          {
            key: "change-password",
            title: "Zmień hasło",
            icon: <Ionicons name="lock-closed-outline" size={20} color="#111827" />,
            onPress: () => router.push("/changepassword"),
          },
          {
            key: "account-settings",
            title: "Ustawienia konta",
            icon: <FontAwesome5 name="user-shield" size={18} color="#111827" />,
            onPress: () => router.push("/profile/account-settings"),
          },
        ],
      },
      {
        key: "logout",
        title: "",
        items: [
          {
            key: "logout-btn",
            title: "Wyloguj się",
            icon: <Ionicons name="log-out-outline" size={20} color="#DC2626" />,
            danger: true,
            showChevron: false,
            onPress: async () => await logout(),
          },
        ],
      },
    ],
    [router, logout]
  );

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-zinc-50">
      <ScrollView className="bg-zinc-50" contentContainerStyle={{ paddingBottom: 30 }}>
        {/* KAFEL PROFILU */}
        <View className="px-5 pt-5">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/profile/account-settings")}
            className="bg-white rounded-2xl border border-zinc-100 p-4 flex-row items-center"
          >
            <Image
              source={{
                uri:
                  me?.avatarUrl ??
                  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=300&q=60",
              }}
              className="w-14 h-14 rounded-full"
            />

            <View className="flex-1 ml-4">
              <Text className="text-[18px] text-zinc-900 font-psemibold">
                {me?.email ?? "Użytkownik"}
              </Text>
              <Text className="text-[13px] text-zinc-500 font-pregular">{me?.email}</Text>
              <Text className="text-[13px] text-teal-600 font-psemibold mt-1">
                Zobacz moje zgłoszenia
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
          </TouchableOpacity>
        </View>

        {/* LISTA USTAWIEŃ */}
        <SettingsList sections={sections} />
      </ScrollView>
    </SafeAreaView>
  );
}
