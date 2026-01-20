import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BREEDS } from '@/data/breed';
import { AnimalType } from '@/types/AnimalType';
import { Breed } from '@/types/Bred';

type Props = {
  animalType: AnimalType;
  selectedBreedId?: string;
  onSelect: (breed: Breed) => void;
  onClose: () => void;
};

const BreedPickerModal: React.FC<Props> = ({
  animalType,
  selectedBreedId,
  onSelect,
  onClose,
}) => {
  const breeds = [...(BREEDS[animalType] ?? [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-8 pb-4 flex-row items-center border-b border-gray-200">
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-4">Wybierz rasę2</Text>
      </View>

      <FlatList
        data={breeds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const active = item.id === selectedBreedId;

          return (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              className="flex-row items-center px-4 py-3 border-b border-gray-100"
            >
              <Image
                source={{ uri: item.image }}
                className="w-12 h-12 rounded-lg mr-4 bg-gray-200"
              />

              <Text className={`flex-1 ${active ? 'font-bold' : ''}`}>
                {item.name}
              </Text>

              {active && (
                <Ionicons name="checkmark" size={20} color="black" />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default BreedPickerModal;
