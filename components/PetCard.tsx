import React, { useState } from 'react';
import { View, Text, Image, ImageSourcePropType, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { images } from "../constants";
import { Pet } from '@/types/Pet';
import { router, useRouter } from 'expo-router';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';


type PetCardProps = {
  pet: Pet;
};

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const router = useRouter();
  const [pressedPetId, setPressedPetId] = useState<number | null>(null);
  const timeAgo = formatDistanceToNow(parseISO(pet.date), { addSuffix: true, locale: pl});

  const handlePress = (pet: Pet) => {
    
    router.push({
        pathname: `/pet/[id]`,
        params: { id: pet.id.toString(), pet: JSON.stringify(pet) },
    });
  };
  const handlePressIn = (id: number) => {
    setPressedPetId(id);
  };

  const handlePressOut = () => {
    setPressedPetId(null);
  };
    return (
      <Pressable
      key={pet.id}
      onPressIn={() => handlePressIn(pet.id)}
      onPressOut={handlePressOut}
      onPress={() => handlePress(pet)}
      className={`${
        pressedPetId === pet.id ? 'opacity-75' : 'opacity-100'
      }`}
    >
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
          <Image source={pet.image} className="w-full h-40" />
          <View className="absolute top-2 left-3 w-20 h-5 rounded-full bg-red-500 flex items-center justify-center">
            <Text className="text-white text-xs font-plight">Poszukiwany</Text>
            </View>
        </View>
        <View className="p-3">
          <Text className="text-lg font-pbold">{pet.name}</Text>
          <View className="flex-row items-center my-1">
            <FontAwesome name="calendar" size={16} color="gray" />
            <Text className="ml-2 text-gray-500 font-plight">{timeAgo}</Text>
          </View>
          <Text className="text-gray-500 font-plight">{pet.address}</Text>
        </View>
      </View>
 </Pressable>

    );
  };

export default PetCard;
