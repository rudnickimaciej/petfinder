import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Pet } from '@/types/Pet';
import images from './../../constants/images';

const PetCardDetail: React.FC = () => {
  const route = useRoute();
  const { pet } = route.params as { pet: Pet };

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
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="pt-10 bg-white">
      {/* Pet Image */}
      <Image source={images.dog2} className="w-full h-72 rounded-xl mb-4" />

      {/* Pet Info */}
      <View className="bg-white rounded-xl p-6 shadow">
        {/* Pet Name and Heart Icon */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-3xl font-bold text-gray-800">{pet2.name}</Text>
          <TouchableOpacity>
            <MaterialIcons name="favorite-border" size={28} color="red" />
          </TouchableOpacity>
        </View>

        {/* Pet Breed and Tags */}
        <Text className="text-lg italic text-gray-500 mb-4">{pet2.breed}</Text>
        <View className="flex-row flex-wrap mb-4">
          <View className="bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2">
            <Text className="text-sm text-gray-600">Friendly</Text>
          </View>
          <View className="bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2">
            <Text className="text-sm text-gray-600">Energetic</Text>
          </View>
          <View className="bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2">
            <Text className="text-sm text-gray-600">Golden Retriever</Text>
          </View>
        </View>

        {/* Pet Description */}
        <Text className="text-base text-gray-700 mb-4">{pet2.description}</Text>

        {/* Date Missing */}
        <View className="flex-row items-center mb-4">
          <FontAwesome name="calendar" size={18} color="gray" />
          <Text className="ml-2 text-base font-semibold text-gray-600">Date Missing:</Text>
          <Text className="ml-2 text-base text-gray-600">{pet2.dateOfMissing}</Text>
        </View>

        {/* Location */}
        <View className="flex-row items-center mb-4">
          <FontAwesome name="map-marker" size={18} color="gray" />
          <Text className="ml-2 text-base font-semibold text-gray-600">Location:</Text>
          <Text className="ml-2 text-base text-gray-600">{pet2.location}</Text>
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

        {/* Call / SMS Button */}
        <TouchableOpacity className="bg-blue-500 p-4 rounded-xl mt-6 flex-row justify-center items-center">
          <MaterialIcons name="phone" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Call / SMS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PetCardDetail;
