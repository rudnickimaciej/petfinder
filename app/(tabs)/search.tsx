import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import SearchHeader from "@/components/search/header";
import PetCard from "@/components/pet/PetCard";
import postService from "@/api/post.service";
import { PostPreview } from "@/types/Post";
import { ViewMode } from "@/types/ViewMode";
import mapMissingPetToPostPreview from "@/api/mappers/petPreview.mapper";

const PetSearchScreen: React.FC = () => {
  const params = useLocalSearchParams();

  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const pageSize = 20;

  const animalType = params.animalType as string | undefined;
  const breedId = params.breedId as string | undefined;
  const latitude = params.latitude ? Number(params.latitude) : undefined;
  const longitude = params.longitude ? Number(params.longitude) : undefined;
  const radiusKm = params.radiusKm ? Number(params.radiusKm) : undefined;
  const cityName = params.cityName as string | undefined;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const result = await postService.searchMissingPets(
        {
          animalType,
          breedId,
          latitude,
          longitude,
          radiusKm,
          page,
          pageSize,
        },
        null
      );

      const mapped = result.items.map(mapMissingPetToPostPreview);

      setPosts(prev =>
        page === 1 ? mapped : [...prev, ...mapped]
      );
      setTotalCount(result.totalCount);
    } finally {
      setLoading(false);
    }
  };

  // reset strony przy zmianie filtrów
  useEffect(() => {
    setPage(1);
  }, [animalType, breedId, latitude, longitude, radiusKm]);

  // fetch danych
  useEffect(() => {
    fetchPosts();
  }, [page, animalType, breedId, latitude, longitude, radiusKm]);

  return (
    <View className="flex-1">
      {loading && page === 1 && (
        <ActivityIndicator className="mt-10" size="large" />
      )}

      <FlatList
        key={viewMode} // reset layout przy zmianie grid/list
        data={posts}
        numColumns={viewMode === "grid" ? 2 : 1}
        renderItem={({ item }) => (
          <PetCard pet={item} variant={viewMode} />
        )}
        ListHeaderComponent={
          <>
            {/* SEARCH HEADER (CHIPY) */}
            <SearchHeader
              animalType={animalType}
              cityName={cityName}
              latitude={latitude}
              longitude={longitude}
              radiusKm={radiusKm}
            />

            {/* INFO + TRYB WIDOKU */}
            <View className="px-4 py-2 flex-row justify-between items-center border-b border-gray-100 bg-white">
              <Text className="font-semibold">
                Znaleźliśmy {totalCount} ogłoszeń
              </Text>

              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => setViewMode("list")}
                  className="mr-4"
                >
                  <Ionicons
                    name="list-outline"
                    size={22}
                    color={viewMode === "list" ? "black" : "#9ca3af"}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setViewMode("grid")}
                  className="mr-4"
                >
                  <Ionicons
                    name="grid-outline"
                    size={22}
                    color={viewMode === "grid" ? "black" : "#9ca3af"}
                  />
                </TouchableOpacity>

                <TouchableOpacity disabled>
                  <Ionicons
                    name="map-outline"
                    size={22}
                    color="#d1d5db"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        onEndReached={() => {
          if (posts.length < totalCount) {
            setPage(p => p + 1);
          }
        }}
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PetSearchScreen;
