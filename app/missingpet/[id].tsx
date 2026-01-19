import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import postService from "@/api/post.service";
import Tag from "@/components/tags/Tag";
import { MissingPetDetails } from "@/types/Post";
import mapMissingPetDetailsResponse from "@/api/mappers/postDetails.mapper";

const { width } = Dimensions.get("window");

const MissingPetPage: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [pet, setPet] = useState<MissingPetDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPet = async () => {
      try {
        const response = await postService.getMissingPetById(id, null);
        setPet(mapMissingPetDetailsResponse(response));
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pet) return null;

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="pt-10 px-2 bg-gray-200"
    >
      {/* GALERIA */}
      <View className="relative">
        <FlatList
          data={pet.photos}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `image-${index}`}
          renderItem={({ item }) => (
            <Image
              source={{ uri: `https://findpet.blob.core.windows.net/posts${item}`,
}}
              className="h-64"
              style={{ width }}
            />
          )}
        />
      </View>

      {/* INFO + TAGI */}
      <View className="bg-white p-4 shadow">
        <View className="flex-row justify-between items-center mb-5">
          <View>
            <Text className="text-sm text-blue-500">
              {pet.breedId ?? "Nieznana rasa"}
            </Text>
          </View>

          {pet.lastSeenPlaceDescription && (
            <View className="flex-row items-center">
              <MaterialIcons
                name="location-on"
                size={16}
                color="gray"
              />
              <Text className="text-sm text-gray-600 ml-1">
                {pet.lastSeenPlaceDescription}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row flex-wrap mb-4">
          {pet.gender && (
            <Tag
              text={pet.gender}
              icon="venus-mars"
              color="purple"
              size="medium"
            />
          )}

          {pet.age && (
            <Tag
              text={`${pet.age} lat`}
              icon="calendar"
              color="green"
              size="medium"
            />
          )}

          <Tag
            text="Zaginione"
            icon="alert-circle"
            color="red"
            size="medium"
          />
        </View>
      </View>

      {/* ZGŁASZAJĄCY */}
      {pet.owner && (
        <View className="bg-white px-6 mt-4 rounded-lg shadow">
          <View className="flex-row items-center mb-4 mt-4">
            {pet.owner.avatarUrl && (
              <Image
                source={{ uri: pet.owner.avatarUrl }}
                className="w-12 h-12 rounded-full mr-4"
              />
            )}

            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800">
                {pet.owner.name}
              </Text>
              <Text className="text-sm text-gray-600">
                Właściciel
              </Text>
            </View>

            <TouchableOpacity>
              <Text className="text-sm text-blue-500 font-bold">
                Napisz
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* OPIS */}
      {pet.description && (
        <View className="bg-white p-4 mt-4 rounded-lg shadow">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Opis
          </Text>
          <Text className="text-base text-gray-600">
            {pet.description}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default MissingPetPage;
