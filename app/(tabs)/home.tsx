import RedirectionCard from '@/components/cards/RedirectionCards';
import HomeHeader from '@/components/headers/HomeHeader';
import PetList from '@/components/pet/PetList';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { missingPets } from '@/api/missingpetsmock';
import { foundPets } from '@/api/foundpetsmock';

const HomePage: React.FC = () => {
    
  return (
    <>
    <HomeHeader/>
    <ScrollView className='flex-1'>
    <View className="flex-row justify-between px-4 py-8">
      <RedirectionCard text="Zgłoś zaginięcie" color="red" targetScreen="create" />
      <RedirectionCard text="Zgłoś znalezienie" color="green" targetScreen="profile" />
    </View>
      <PetList listName="Zagubione zwierzaki" pets={missingPets}/>         
      <PetList listName="Znalezione zwierzaki" pets={foundPets}/>    
    </ScrollView>
    </>
  );
}
export default HomePage;
