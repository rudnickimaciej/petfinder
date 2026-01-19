import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SettingsRowProps = {
  icon: React.ReactNode;
  title: string;
  rightText?: string;
  onPress?: () => void;
  showChevron?: boolean;
  danger?: boolean;
};

export default function SettingsRow({
  icon,
  title,
  rightText,
  onPress,
  showChevron = true,
  danger = false,
}: SettingsRowProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center px-5 py-4 bg-white"
    >
      <View className="w-8 items-center">{icon}</View>

      <View className="flex-1 ml-3">
        <Text className={`text-[16px] font-pregular ${danger ? "text-red-600" : "text-zinc-900"}`}>
          {title}
        </Text>
      </View>

      {rightText ? (
        <Text className="text-[14px] text-zinc-500 mr-2 font-pregular">{rightText}</Text>
      ) : null}

      {showChevron ? (
        <Ionicons name="chevron-forward" size={18} color="#A1A1AA" />
      ) : null}
    </TouchableOpacity>
  );
}
