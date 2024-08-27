import CustomHeader from '@/components/headers/CustomHeader';
import MapWithMarkers from '@/components/MapWithMarkers';
import PetList from '@/components/PetList';
import { PetOnMap } from '@/types/Pet';
import React from 'react';
import { ScrollView, View,StyleSheet } from 'react-native';


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
      date: '2024-08-15',
      address: '123 Pet Lane',
      image: 'buddy',
    },
    {
      id: 2,
      name: 'Luna',
      date: '2024-08-16',
      address: '456 Furry Ave',
      image: 'luna',
    },
    {
        id: 3,
        name: 'Luna',
        date: '2024-08-16',
        address: '456 Furry Ave',
        image: 'luna',
      }
  ];
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <ScrollView className='flex-1'>
            <CustomHeader/>

      <MapWithMarkers pets={pets} initialRegion={initialRegion} />
      <PetList listName="Zagubione zwierzaki" pets={missingPets}/>         
      <PetList listName="Znalezione" pets={missingPets}/>    
    </ScrollView>
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
