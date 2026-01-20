import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostPreview, PostType } from "@/types/Post";
import { formatDistanceToNow, parseISO } from "date-fns";
import { pl } from "date-fns/locale";
import { useRouter } from "expo-router";
import { ViewMode } from "@/types/ViewMode";

type Props = {
  pet: PostPreview;
  variant?: ViewMode;
};

const PetCard: React.FC<Props> = ({ pet, variant = "list" }) => {
  const router = useRouter();

  const timeAgo = formatDistanceToNow(parseISO(pet.date), {
    addSuffix: true,
    locale: pl,
  });

  const onPress = () => {
    router.push(
      pet.postType === PostType.Missing
        ? { pathname: "/missingpet/[id]", params: { id: pet.id } }
        : { pathname: "/foundpet/[id]", params: { id: pet.id } }
    );
  };

  if (variant === "grid") {
    return (
      <Pressable onPress={onPress} style={{ flex: 1, margin: 6 }}>
        <View className="bg-white rounded-xl overflow-hidden">
          <Image
            source={{
              uri: `https://findpet.blob.core.windows.net/posts${pet.mainImage}`,
            }}
            className="w-full h-32"
          />

          <View className="p-3">
            <Text className="font-semibold" numberOfLines={1}>
              {pet.name}
            </Text>

            {/* {pet.location?.name && (
              <Text className="text-xs text-gray-500" numberOfLines={1}>

                {pet.location.name}
              </Text>
            )} */}
             <Text className="text-xs text-gray-500" numberOfLines={1}>

                Warszawa
              </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} className="px-4 mb-3">
      <View className="flex-row bg-white rounded-xl overflow-hidden border border-gray-200">
        <Image
          source={{
            uri: `https://findpet.blob.core.windows.net/posts${pet.mainImage}`,
          }}
          className="w-44 h-32"
        />

        <View className="flex-1 p-3 justify-between">
          <View>
            <Text
              className="font-semibold text-base"
              numberOfLines={2}
            >
              {pet.name}
            </Text>

            <View className="mt-1 self-start px-2 py-0.5 rounded-full bg-gray-100">
              <Text className="text-xs text-gray-600">
                {pet.postType === PostType.Missing
                  ? "Zaginione"
                  : "Znalezione"}
              </Text>
            </View>
          </View>

          <View>
            {/* {pet.location?.name && (
              <Text className="text-sm text-gray-600">
                {pet.location.name}
              </Text>
            )} */}
              <Text className="text-xs text-gray-500" numberOfLines={1}>

                Warszawa
              </Text>
            <Text className="text-xs text-gray-400">
              {timeAgo}
            </Text>
          </View>
        </View>

        <View className="p-3">
          <Ionicons
            name="heart-outline"
            size={22}
            color="#9ca3af"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default PetCard;
