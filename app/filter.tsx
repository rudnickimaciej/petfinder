import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Breed } from '@/types/Bred';
import { AnimalType } from '@/types/AnimalType';
import BreedSelect from '@/components/breed/breedselect';

const Section = ({ title, children }: any) => (
  <View className="mb-6">
    <Text className="font-semibold mb-2">{title}</Text>
    {children}
  </View>
);

const Chip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full mr-2 ${
      active ? 'bg-black' : 'bg-gray-100'
    }`}
  >
    <Text className={active ? 'text-white' : 'text-black'}>{label}</Text>
  </TouchableOpacity>
);

const PetFilterScreen: React.FC = () => {
  const router = useRouter();

  const [sort, setSort] = useState<'recommended' | 'newest'>('recommended');
  const [onlyWithLocation, setOnlyWithLocation] = useState(false);
  const [radiusKm, setRadiusKm] = useState(10);
    const [animalType, setAnimalType] = useState<AnimalType>('dog');
    const [breed, setBreed] = useState<Breed | undefined>();

  const applyFilters = () => {
    router.push({
      pathname: '/search',
      params: {
        radiusKm,
      },
    });
  };

  useEffect(() => {
    setBreed(undefined);
    }, [animalType]);
    
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-4 pt-8">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold">Filtry</Text>
          <TouchableOpacity
            onPress={() => {
              setSort('recommended');
              setOnlyWithLocation(false);
              setRadiusKm(10);
            }}
          >
            <Text className="text-gray-500 font-semibold">             
                 WYCZYŚĆ FILTRY
                </Text>
          </TouchableOpacity>
        </View>

        <Section title="Sortuj">
          <View className="flex-row">
            <Chip
              label="Wybrane dla Ciebie"
              active={sort === 'recommended'}
              onPress={() => setSort('recommended')}
            />
            <Chip
              label="Najnowsze"
              active={sort === 'newest'}
              onPress={() => setSort('newest')}
            />
          </View>
        </Section>


      <Section title="Wybierz rasę">
        <BreedSelect
            animalType={animalType}
            value={breed}
            onChange={setBreed}
        />
        </Section>

        <Section title="Wybierz lokalizację">
          <TouchableOpacity className="border border-gray-300 rounded-lg px-4 py-3">
            <Text className="text-gray-500">Wybierz</Text>
          </TouchableOpacity>
        </Section>
      </ScrollView>

      {/* Sticky footer */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-black rounded-xl py-4"
          onPress={applyFilters}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Filtruj
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetFilterScreen;
