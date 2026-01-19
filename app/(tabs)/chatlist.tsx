import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { formatDistanceToNow, parseISO } from "date-fns";
import { pl } from "date-fns/locale";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChatPreview } from "@/types/Chat";

const chats: ChatPreview[] = [
  {
    id: "1",
    userName: "haniulax_ks",
    lastMessage: "Hej!! Jesteś zainteresowana zakupem?....",
    timestamp: "2024-08-29T12:48:00.000Z",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&q=80&w=200",
    status: "unread",
  },
  {
    id: "2",
    userName: "fapjanxx",
    lastMessage: "38,00 zł",
    timestamp: "2024-08-25T14:18:00.000Z",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&q=80&w=200",
    status: "read",
  },
  {
    id: "3",
    userName: "asi0499",
    lastMessage: "Hej! Zgodzisz się na sprzedaż za 69,0...",
    timestamp: "2024-08-18T13:48:00.000Z",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&q=80&w=200",
    status: "read",
  },
];

type TabKey = "messages" | "notifications";

const TabsHeader = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}) => {
  return (
    <View className="bg-white">
      {/* Title */}
      <View className="px-5 pt-4 pb-2">
        <Text className="text-[26px] font-psemibold text-zinc-900">Wiadomości</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row px-5">
        <TouchableOpacity
          onPress={() => setActiveTab("messages")}
          className="flex-1 items-center pb-3"
          activeOpacity={0.8}
        >
          <Text
            className={`text-[16px] font-pregular ${
              activeTab === "messages" ? "text-zinc-900" : "text-zinc-500"
            }`}
          >
            Wiadomości
          </Text>
          {activeTab === "messages" ? (
            <View className="h-[3px] w-full bg-teal-600 rounded-full mt-2" />
          ) : (
            <View className="h-[3px] w-full bg-transparent rounded-full mt-2" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("notifications")}
          className="flex-1 items-center pb-3"
          activeOpacity={0.8}
        >
          <Text
            className={`text-[16px] font-pregular ${
              activeTab === "notifications" ? "text-zinc-900" : "text-zinc-500"
            }`}
          >
            Powiadomienia
          </Text>
          {activeTab === "notifications" ? (
            <View className="h-[3px] w-full bg-teal-600 rounded-full mt-2" />
          ) : (
            <View className="h-[3px] w-full bg-transparent rounded-full mt-2" />
          )}
        </TouchableOpacity>
      </View>

      <View className="h-[1px] bg-zinc-200" />
    </View>
  );
};

const EnableNotificationsBanner = () => {
  return (
    <View className="bg-white">
      <View className="px-5 py-4 flex-row items-center justify-between">
        <Text className="text-[18px] text-zinc-500 font-pregular">Włącz powiadomienia</Text>

        <TouchableOpacity activeOpacity={0.8}>
          <Ionicons name="information-circle-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>
      <View className="h-[1px] bg-zinc-200" />
    </View>
  );
};

const ChatRow = ({ item }: { item: ChatPreview }) => {
  const timeAgo = formatDistanceToNow(parseISO(item.timestamp), {
    addSuffix: true,
    locale: pl,
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/chats/${item.id}`)}
      className="bg-white"
    >
      <View className="flex-row px-5 py-4">
        <Image source={{ uri: item.avatar }} className="w-14 h-14 rounded-full" />

        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-[18px] text-zinc-900 font-psemibold">{item.userName}</Text>
            <Text className="text-[13px] text-zinc-500 font-pregular">{timeAgo}</Text>
          </View>

          <Text
            numberOfLines={1}
            className={`text-[15px] mt-1 ${
              item.status === "unread" ? "text-zinc-900 font-psemibold" : "text-zinc-500 font-pregular"
            }`}
          >
            {item.lastMessage}
          </Text>
        </View>
      </View>

      {/* divider jak na screenie */}
      <View className="h-[1px] bg-zinc-200 ml-[92px]" />
    </TouchableOpacity>
  );
};

const NotificationEmpty = () => {
  return (
    <View className="flex-1 bg-white">
      <EnableNotificationsBanner />
      <View className="px-5 pt-6">
        <Text className="text-[15px] text-zinc-500 font-pregular">
          Brak powiadomień.
        </Text>
      </View>
    </View>
  );
};

const ChatListScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("messages");

  const data = useMemo(() => chats, []);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "notifications" ? (
        <NotificationEmpty />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatRow item={item} />}
          ListHeaderComponent={<EnableNotificationsBanner />}
          className="bg-white"
        />
      )}
    </SafeAreaView>
  );
};

export default ChatListScreen;
