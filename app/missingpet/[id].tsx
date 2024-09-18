import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import images from '../../constants/images';
import Tag from '@/components/tags/Tag';
import { missingPets } from '@/api/missingpetsmock';
const { width } = Dimensions.get('window');

const MissingPetPage: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const pet = missingPets.find(pet => pet.id.toString() === id.toString());
  if(!pet)
    return;

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="pt-10 px-2 bg-grey">
      <View className="relative">
        <FlatList
          data={pet.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `image-${index}`}
          renderItem={({ item }) => (
            <Image source={pet.images[0]} className="w-full h-64" style={{ width }} />
          )}
        />
      </View>

      {/* Pet Info Tags */}
      <View className="bg-white p-4 shadow">
        <View className="flex-row justify-between items-center mb-5">
          <View>
                <Text className="text-sm text-blue-500">{pet.breed}</Text>
           </View>
            <View className="flex-row items-center">
                <MaterialIcons name="location-on" size={16} color="gray" />
                <Text className="text-sm text-gray-600">{pet.location}</Text>
            </View>
         </View>

        <View className="flex-row flex-wrap mb-4">
        <Tag text={pet.sex} icon="venus-mars" color="purple" size="medium" />
          <Tag text={pet.age} icon="calendar" color="green" size="medium" />
          <Tag text={pet.temper} icon="smile-o" color="green" size="medium" />

        </View>
      </View>

      {/* Pet's Story */}
      <View className="bg-white px-6 mt-4 rounded-lg shadow">
      <View className="flex-row items-center mb-4 mt-4">
          <Image source={{ uri: pet.user.avatar }} className="w-12 h-12 rounded-full mr-4" />
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-800">{pet.user.name}</Text>
            <Text className="text-sm text-gray-600">Właściciel</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-blue-500 font-bold">Napisz</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-white p-4 mt-4 rounded-lg shadow">
        <Text className="text-lg font-bold text-gray-800 mb-2">Opis</Text>
        <Text className="text-base text-gray-600">{pet.story}</Text>
      </View>
    </ScrollView>
  );
};

export default MissingPetPage;
