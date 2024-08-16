import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { images } from "../constants";
import { Pet } from '@/types/Pet';


type PetCardProps = {
  pet: Pet;
};

const petImages: Record<Pet['image'], ImageSourcePropType> = {
  buddy: images.dog,
  luna: images.dog,
};

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    return (
      <View className="bg-white rounded-lg overflow-hidden mr-4 w-48"
    //   style={{
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 5, // For Android shadow
    //   }}
    >
        <View className="relative">
          <Image source={petImages[pet.image]} className="w-full h-40" />
          <View className="absolute top-2 left-3 w-20 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Text className="text-white text-xs font-plight">In Search</Text>
            </View>
        </View>
        <View className="p-3">
          <Text className="text-lg font-pbold">{pet.name}</Text>
          <View className="flex-row items-center my-1">
            <FontAwesome name="calendar" size={16} color="gray" />
            <Text className="ml-2 text-gray-500 font-plight">{pet.date}</Text>
          </View>
          <Text className="text-gray-500 font-plight">{pet.address}</Text>
        </View>
      </View>
    );
  };

export default PetCard;
