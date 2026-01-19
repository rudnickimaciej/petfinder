import React from "react";
import { View, Text } from "react-native";
import SettingsRow from "./SettingsRow";
import SettingsDivider from "./SettingsDivider";

export type SettingsItem = {
  key: string;
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
  rightText?: string;
  showChevron?: boolean;
  danger?: boolean;
  hidden?: boolean;
};

export type SettingsSection = {
  key: string;
  title?: string;
  items: SettingsItem[];
};

export default function SettingsList({ sections }: { sections: SettingsSection[] }) {
  return (
    <View>
      {sections
        .filter((s) => s.items.some((i) => !i.hidden))
        .map((section) => {
          const visibleItems = section.items.filter((i) => !i.hidden);

          return (
            <View key={section.key}>
              {section.title ? (
                <Text className="px-5 pt-6 pb-2 text-[13px] text-zinc-500 font-psemibold uppercase tracking-wide">
                  {section.title}
                </Text>
              ) : (
                <View className="h-4" />
              )}

              <View className="bg-white border-y border-zinc-100">
                {visibleItems.map((item, idx) => (
                  <View key={item.key}>
                    <SettingsRow
                      icon={item.icon}
                      title={item.title}
                      rightText={item.rightText}
                      onPress={item.onPress}
                      showChevron={item.showChevron ?? true}
                      danger={item.danger}
                    />
                    {idx !== visibleItems.length - 1 ? <SettingsDivider /> : null}
                  </View>
                ))}
              </View>
            </View>
          );
        })}
    </View>
  );
}
