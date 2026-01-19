import React, { useState } from 'react';
import { View, Text, Image, ImageSourcePropType, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FoundPPost, MissingPost, } from '@/types/Post';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useRouter } from 'expo-router';


type MissingPetCardProps = {
  pet: MissingPost;
};

const MissingPetCard: React.FC<MissingPetCardProps> = ({ pet }) => {
  const router = useRouter();
  const [pressedPetId, setPressedPetId] = useState<number | null>(null);
  const timeAgo = formatDistanceToNow(parseISO(pet.date), { addSuffix: true, locale: pl});

  const handlePress = (pet: MissingPost) => {
    
    router.push({
        pathname: `/missingpet/[id]`,
        params: { id: pet.id },
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
      <View className="bg-white rounded-lg overflow-hidden mr-4 w-48">
        <View className="relative">
          <Image source={pet.images[0]} className="w-full h-40" />
        </View>
        <View className="p-3">
        <Text className="text-lg font-psemibold">{pet.name}</Text>
          <View className="flex-row items-center my-1">
            <FontAwesome name="calendar" size={16} color="gray" />
            <Text className="ml-2 text-gray-500 font-plight">{timeAgo}</Text>
          </View>
          <Text className="text-gray-500 font-plight">{pet.location}</Text>
        </View>
      </View>
 </Pressable>

    );
  };

export default MissingPetCard;
