import RedirectionCard from '@/components/cards/RedirectionCards';
import CustomHeader from '@/components/headers/CustomHeader';
import HomeHeader from '@/components/headers/HomeHeader';
import MapWithMarkers from '@/components/MapWithMarkers';
import PetList from '@/components/PetList';
import { Pet, PetOnMap } from '@/types/Pet';
import React from 'react';
import { ScrollView, View,StyleSheet } from 'react-native';
import { images } from "../../constants";

const HomePage: React.FC = () => {
  const pets:PetOnMap[] = [
    {
      id: '1',
      name: 'Bella',
      lat: 37.78825,
      lng: -122.4324,
      image: 'https://example.com/bella.jpg',
      type: 'dog',
      description: 'A friendly dog lost in downtown.',
      lastSeenDate: '2024-08-20T14:48:00.000Z'
    },
    {
      id: '2',
      name: 'Max',
      lat: 37.75825,
      lng: -122.4624,
      image: 'https://example.com/max.jpg',
      type: 'cat',
      description: 'A curious cat last seen in uptown.',
      lastSeenDate: '2024-08-17T14:48:00.000Z'
    },
  ];
  const missingPets: Pet[] = [
    {
      id: 1,
      name: 'Buddy',
      date: '2024-09-15',
      address: 'Warszawa',
      image: images.missing_pet_1,
    },
    {
      id: 2,
      name: 'Luna',
      date: '2024-09-16',
      address: 'Pułtusk',
      image: images.missing_pet_2,
    },
    {
        id: 3,
        name: 'Sara',
        date: '2024-09-16',
        address: 'Pułtusk',
        image: images.missing_pet_3,
      },
      {
        id: 4,
        name: 'Tara',
        date: '2024-08-30',
        address: 'Ciechanów',
        image: images.missing_pet_4,
      },
      {
        id: 5,
        name: 'Kropka',
        date: '2024-08-29',
        address: 'Ciechanów',
        image: images.missing_pet_5,
      }
    ]
      const foundPets: Pet[] = [
        {
          id: 10,
          name: 'Buddy',
          date: '2024-09-15',
          address: 'Ciechanów',
          image: images.found_pet_1
        },
        {
          id: 20,
          name: 'Luna',
          date: '2024-09-16',
          address: 'Pułtusk',
          image: images.found_pet_2
        },
        {
            id: 30,
            name: 'Sara',
            date: '2024-09-17',
            address: 'Pułtusk',
            image: images.found_pet_3,
          },
          {
            id: 40,
            name: 'Tara',
            date: '2024-09-17',
            address: 'Warszawa',
            image: images.found_pet_4,
          },
          {
            id: 50,
            name: 'Kropka',
            date: '2024-08-30',
            address: 'Warszawa',
            image: images.found_pet_5,
          }
    
  ];
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <>
     <HomeHeader/>
    <ScrollView className='flex-1'>
    <View className="flex-row justify-between px-4 py-8">
      <RedirectionCard text="Zgłoś zaginięcie" color="red" targetScreen="create" />
      <RedirectionCard text="Zgłoś znalezienie" color="green" targetScreen="profile" />
    </View>
      {/* <MapWithMarkers pets={pets} initialRegion={initialRegion} /> */}
      <PetList listName="Zagubione zwierzaki" pets={missingPets}/>         
      <PetList listName="Znalezione zwierzaki" pets={foundPets}/>    
    </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });
export default HomePage;
