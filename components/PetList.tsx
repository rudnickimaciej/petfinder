import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import PetCard from './PetCard';
import { Pet } from '@/types/Pet';
import { useNavigation } from '@react-navigation/native';
import  PetListNavigationProp from './../types/PetCardNavigation'; // Import the type you defined
import { useRouter } from 'expo-router';

type PetListProps = {
  pets: Pet[];
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
        {pets.map((pet) => (
            <PetCard pet={pet} key = {pet.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PetList;
