// src/screens/PetCardDetail.tsx
import React from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Post } from '@/types/Post';

const PetCardDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { pet } = route.params as { pet: Post };

  const pet2 = {
    name: 'Buddy',
    image: 'https://via.placeholder.com/300.png',
    description:
      'Buddy is a friendly and energetic golden retriever who loves to play fetch. He has a shiny golden coat and bright, intelligent eyes.',
    dateOfMissing: '2024-08-15',
    location: '123 Pet Lane',
    breed: 'Golden Retriever',
    user: {
      name: 'John Doe',
      contact: 'john.doe@example.com',
      avatar: 'https://via.placeholder.com/150.png',
    },
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} className="bg-gray-100">
      {/* Pet Image */}
      <Image source={{ uri: pet.images[0] }} className="w-full h-72 rounded-xl mb-6" />

      {/* Pet Info */}
      <View className="bg-white rounded-xl p-6 shadow">
        <Text className="text-3xl font-bold text-gray-800 mb-2">{pet2.name}</Text>
        <Text className="text-lg italic text-gray-500 mb-4">{pet2.breed}</Text>
        <Text className="text-base text-gray-700 mb-4">{pet2.description}</Text>

        <View className="flex-row justify-between mb-4">
          <Text className="text-base font-semibold text-gray-600">Date Missing:</Text>
          <Text className="text-base text-gray-600">{pet2.dateOfMissing}</Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <Text className="text-base font-semibold text-gray-600">Location:</Text>
          <Text className="text-base text-gray-600">{pet2.location}</Text>
        </View>

        {/* User Info */}
        <View className="border-t border-gray-200 mt-6 pt-4">
          <Text className="text-xl font-bold text-gray-800 mb-4">Reported By:</Text>
          <View className="flex-row items-center">
            <Image source={{ uri: pet2.user.avatar }} className="w-12 h-12 rounded-full mr-4" />
            <View>
              <Text className="text-lg font-semibold text-gray-800">{pet2.user.name}</Text>
              <Text className="text-base text-gray-600">{pet2.user.contact}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PetCardDetail;
