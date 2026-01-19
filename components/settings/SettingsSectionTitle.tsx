import React from "react";
import { Text } from "react-native";

export default function SettingsSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text className="px-5 pt-6 pb-2 text-[13px] text-zinc-500 font-psemibold uppercase tracking-wide">
      {children}
    </Text>
  );
}
