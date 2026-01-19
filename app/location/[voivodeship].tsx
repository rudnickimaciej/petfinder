import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CITIES: Record<string, { name: string; lat: number; lon: number }[]> = {
  mazowieckie: [
    { name: 'Warszawa', lat: 52.2297, lon: 21.0122 },
    { name: 'Płock', lat: 52.5463, lon: 19.7065 },
  ],
  malopolskie: [
    { name: 'Kraków', lat: 50.0647, lon: 19.945 },
  ],
};

export default function CitiesScreen() {
  const { voivodeship } = useLocalSearchParams<{ voivodeship: string }>();
  const router = useRouter();

  const cities = CITIES[voivodeship ?? ''] ?? [];

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-8 pb-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-4">Wybierz miasto</Text>
      </View>

      <FlatList
        data={cities}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/search',
                params: {
                  cityName: item.name,
                  latitude: item.lat,
                  longitude: item.lon,
                  radiusKm: 0,
                },
              })
            }
            className="px-4 py-4 border-b border-gray-100"
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
