import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const VOIVODESHIPS = [
  { key: 'dolnoslaskie', label: 'Dolnośląskie' },
  { key: 'kujawsko-pomorskie', label: 'Kujawsko-pomorskie' },
  { key: 'lubelskie', label: 'Lubelskie' },
  { key: 'mazowieckie', label: 'Mazowieckie' },
  { key: 'malopolskie', label: 'Małopolskie' },
];

const LocationScreen: React.FC = () => {
  const router = useRouter();
  const [useMyLocation, setUseMyLocation] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-8 pb-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">Lokalizacja</Text>
      </View>

      <ScrollView>
        {/* Search */}
        <View className="px-4 mb-4">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Ionicons name="search-outline" size={18} color="#666" />
            <TextInput
              placeholder="Miejscowość lub kod pocztowy"
              className="ml-2 flex-1"
              value={query}
              onChangeText={setQuery}
            />
          </View>
        </View>

        {/* My location */}
        <View className="mx-4 mb-6 p-4 rounded-xl bg-blue-50 flex-row justify-between items-center">
          <View className="flex-row flex-1">
            <Ionicons name="location-outline" size={22} />
            <View className="ml-3">
              <Text className="font-semibold">Twoja lokalizacja</Text>
              <Text className="text-sm text-gray-600">
                Znajdź ogłoszenia blisko Ciebie
              </Text>
            </View>
          </View>
          <Switch value={useMyLocation} onValueChange={setUseMyLocation} />
        </View>

        {/* Whole country */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/search',
              params: { latitude: undefined, longitude: undefined, radiusKm: undefined },
            })
          }
          className="px-4 py-3 border-b border-gray-200"
        >
          <Text className="font-semibold">Cała Polska</Text>
        </TouchableOpacity>

        {/* Voivodeships */}
        <Text className="px-4 mt-6 mb-2 font-semibold text-gray-500">
          WYBIERZ WOJEWÓDZTWO
        </Text>

        {VOIVODESHIPS.map(v => (
          <TouchableOpacity
            key={v.key}
            onPress={() => router.push(`/location/${v.key}`)}
            className="px-4 py-4 border-b border-gray-100 flex-row justify-between items-center"
          >
            <Text>{v.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default LocationScreen;
