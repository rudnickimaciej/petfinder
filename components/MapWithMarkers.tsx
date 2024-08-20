import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {router} from 'expo-router'
interface Pet {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'dog' | 'cat';
  description: string;
  image: string;
  lastSeenDate: string;
}

interface MapWithMarkersProps {
  pets: Pet[];
  initialRegion: Region;
  onPetDetailPress: (petId: string) => void;
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({ pets, initialRegion, onPetDetailPress }) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleMarkerPress = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const handlePress = (pet: Pet) => {
    
    router.push({
        pathname: `/pet/[id]`,
        params: { id: pet.id.toString(), pet: JSON.stringify(pet) },
    });
  };

  return (
    <View className={isFullScreen ? 'absolute top-0 left-0 right-0 bottom-0 flex-1' : 'relative h-72 w-full'}>
      <MapView
        initialRegion={initialRegion}
        className={isFullScreen ? 'flex-1 h-full w-full' : 'flex-1 h-72 w-full'}
      >
        {pets.map((pet) => (
          <Marker
            key={pet.id}
            coordinate={{ latitude: pet.lat, longitude: pet.lng }}
            onPress={() => handleMarkerPress(pet)}
          >
            <FontAwesome5
              name={pet.type === 'dog' ? 'dog' : 'cat'}
              size={32}
              color={pet.type === 'dog' ? '#ff6347' : '#4682b4'}
            />
          </Marker>
        ))}
      </MapView>

      {/* Expand Button */}
      <TouchableOpacity onPress={toggleFullScreen} className="absolute top-2 right-2 bg-white p-2 rounded-full">
        <Text className="text-sm font-bold">{isFullScreen ? 'Minimize' : 'Expand'}</Text>
      </TouchableOpacity>

      {/* Selected Pet Detail at the Bottom of the Map */}
      {selectedPet && (
        <View className="absolute bottom-3 left-2 right-2 bg-white p-4 shadow-lg rounded-t-lg">
          <View className="flex-row pb-2">
            {/* Pet Image */}
            <Image source={{ uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxlib=rb-1.2.1&q=80&w=200' }} className="w-20 h-20 rounded-lg" />
            <View className="flex-1 ml-4">
              {/* Pet Name */}
              <Text className="text-lg font-bold">{selectedPet.name}</Text>
              {/* Last Seen Date with Icon */}
              <View className="flex-row items-center mt-2">
                <MaterialIcons name="date-range" size={20} color="#555" />
                <Text className="ml-2 text-sm text-gray-600">Last seen: {formatDistanceToNow(parseISO(selectedPet.lastSeenDate), { addSuffix: true })}</Text>
              </View>
              {/* Pet Description */}
              <Text className="mt-2 text-sm text-gray-600">{selectedPet.description}</Text>
            </View>
            {/* Button to Redirect to Pet's Page */}
            <TouchableOpacity
              className="bg-blue-500 p-2 rounded-lg"
              onPress={() => handlePress(selectedPet)}
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              <Text className="text-white text-center font-bold text-xs">More Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default MapWithMarkers;
