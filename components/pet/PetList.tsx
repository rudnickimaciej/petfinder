import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import FoundPetCard from './FoundPetCard';
import { FoundPet, MissingPet, Pet } from '@/types/Pet';
import { useNavigation } from '@react-navigation/native';
import  PetListNavigationProp from '../../types/PetCardNavigation'; // Import the type you defined
import { useRouter } from 'expo-router';
import MissingPetCard from './MissingPetCard';

type PetListProps = {
  pets: (FoundPet | MissingPet)[]; // 
  listName: string;
};

const PetList: React.FC<PetListProps> = ({ pets, listName }) => {
  const navigation = useNavigation<PetListNavigationProp>();

//   const handlePress = (pet: Pet) => {
//     navigation.navigate('PetCardDetail', { pet }); // Navigate to the detail screen with the pet data
//   };
  return (
    <View className="mt-6 p-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="font-psemibold text-2xl">{listName}</Text>
        <Pressable onPress={() => console.log('View All Pressed')}>
          <Text className="text-blue-500 text-2xl font-plight">{'>'}</Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {pets.map((pet) => {
          // Conditional rendering based on pet type
          if (pet.type === 'found') {
            return <FoundPetCard key={pet.id} pet={pet as FoundPet} />;
          } else if (pet.type === 'missing') {
            return <MissingPetCard key={pet.id} pet={pet as MissingPet} />;
          }
        })}
      </ScrollView>
    </View>
  );
};

export default PetList;
