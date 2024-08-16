import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import PetCard from './PetCard';
import { Pet } from '@/types/Pet';
import { useNavigation } from 'expo-router';


  type PetListProps = {
    pets: Pet[];
    listName: string
  };
  
const PetList: React.FC<PetListProps> = ({pets, listName}) => {
    const navigation = useNavigation();

    const handlePress = () => {
    //    navigation.navigate("profile",); // Replace 'AnotherPage' with the actual name of the page you want to navigate to.
    };
  return (
    <View className="mt-6 p-4">
    <View className="flex-row justify-between items-center mb-3 px-4">
      <Text className="text-2xl font-bold">{listName}</Text>
      <Pressable onPress={handlePress}>
        <Text className="text-blue-500">View All</Text>
      </Pressable>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </ScrollView>
  </View>
  );
};

export default PetList;