import { Image, StyleSheet, Platform, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Link } from 'expo-router'
import PetCard from '@/components/PetCard';
import PetList from '@/components/PetList';
import { Pet } from '@/types/Pet';
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

export default function HomeScreen() {
  return (
    <ScrollView>
      <PetList listName="Missing Pets" pets={missingPets}/>         
      <PetList listName="Found Pets" pets={missingPets}/>         

   
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
