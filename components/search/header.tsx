import { useRouter } from "expo-router";
import AnimalChip from "../chips/animalchip";
import Chip from "../chips/chip";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

type Props = {
  animalType?: string;
  cityName?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
};

const RADIUS_OPTIONS = [0, 10, 20, 50];

const SearchHeader: React.FC<Props> = ({
  animalType,
  cityName,
  latitude,
  longitude,
  radiusKm,
}) => {
  const router = useRouter();
  const [radiusOpen, setRadiusOpen] = useState(false);

  useEffect(() => {
    setRadiusOpen(false);
  }, [cityName]);

  return (
    <View className="bg-white px-4 pt-8 pb-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        <View className="flex-row items-center">
          {/* FILTRY */}
          <TouchableOpacity
            onPress={() => router.push("/filter")}
            className="px-3 py-2 mr-2 rounded-full border border-gray-300"
          >
            <Ionicons name="filter-outline" size={18} />
          </TouchableOpacity>

          <AnimalChip
            label="Pies"
            active={animalType === "dog"}
            onPress={() => router.setParams({ animalType: "dog" })}
          />

          <AnimalChip
            label="Kot"
            active={animalType === "cat"}
            onPress={() => router.setParams({ animalType: "cat" })}
          />

          <Chip
            label={cityName ?? "Cała Polska"}
            active={!cityName}
            onPress={() => router.push("/location")}
          />

          {cityName && latitude && longitude && (
            <View style={{ position: "relative" }}>
              <Chip
                label={`+${radiusKm ?? 0} km`}
                active
                onPress={() => setRadiusOpen(v => !v)}
              />

              {radiusOpen && (
                <View
                  className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                  style={{ minWidth: 120 }}
                >
                  {RADIUS_OPTIONS.map(r => (
                    <TouchableOpacity
                      key={r}
                      onPress={() => {
                        router.setParams({ radiusKm: r });
                        setRadiusOpen(false);
                      }}
                      className="px-4 py-3"
                    >
                      <Text className={r === radiusKm ? "font-bold" : ""}>
                        +{r} km
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchHeader;
