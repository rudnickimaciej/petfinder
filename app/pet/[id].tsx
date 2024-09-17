import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Pet } from '@/types/Pet';
import images from './../../constants/images';
import Tag from '@/components/tags/Tag';

const { width } = Dimensions.get('window');

const PetCardDetail: React.FC = () => {
  const route = useRoute();
  const { pet } = route.params as { pet: Pet };

  // Example pet data with multiple photos
  const pet2 = {
    name: 'Simba',
    breed: 'Labrador',
    images: [
      'https://via.placeholder.com/300.png?text=Image+1',

      'https://via.placeholder.com/300.png?text=Image+1',
    ],
    sex: 'Suczka',
    age: '2 lata',
    color: 'Brązowy',
    temperament: 'Przyjazny',
    neutered: true,
    vaccinated: true,
    location: 'Green Park (300m)',
    story:
      'Simba to roczny samiec rasy beagle. Jest przyjazny dla ludzi i uwielbia bawić się swoją ulubioną piłką. Zaginął podczas spaceru w parku, kiedy nagle wybiegł za piłką i nie wrócił.',
    user: {
      name: 'Varsha',
      contact: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200',
    },
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="pt-10 px-2 bg-grey">
      {/* Image with Overlay */}
      <View className="relative">
        <FlatList
          data={pet2.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `image-${index}`}
          renderItem={({ item }) => (
            <Image source={images.dog2} className="w-full h-64" style={{ width }} />
          )}
        />
      </View>

      {/* Pet Info Tags */}
      <View className="bg-white p-4 shadow">
        <View className="flex-row justify-between items-center mb-5">
          <View>
                <Text className="text-2xl font-bold text-gray-800">{pet2.name}</Text>
                <Text className="text-sm text-blue-500">{pet2.breed}</Text>
           </View>
            <View className="flex-row items-center">
                <MaterialIcons name="location-on" size={16} color="gray" />
                <Text className="text-sm text-gray-600">{pet2.location}</Text>
            </View>
         </View>

        <View className="flex-row flex-wrap mb-4">     
        <Tag text={pet2.sex} icon="venus-mars" color="purple" size="medium" />
          <Tag text={pet2.age} icon="calendar" color="green" size="medium" />
          <Tag text={pet2.color} icon="paint-brush" color="green" size="medium" />
          <Tag text={pet2.temperament} icon="smile-o" color="green" size="medium" />
          {pet2.vaccinated && <Tag text="Zaszczepiona" icon="check" color="green" size="medium" />}
  
        </View>
      </View>

      {/* Pet's Story */}
      <View className="bg-white px-6 mt-4 rounded-lg shadow">
      <View className="flex-row items-center mb-4 mt-4">
          <Image source={{ uri: pet2.user.avatar }} className="w-12 h-12 rounded-full mr-4" />
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-800">{pet2.user.name}</Text>
            <Text className="text-sm text-gray-600">Właściciel</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-blue-500 font-bold">Napisz</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-white p-4 mt-4 rounded-lg shadow">
        <Text className="text-lg font-bold text-gray-800 mb-2">Opis</Text>
        <Text className="text-base text-gray-600">{pet2.story}</Text>
      </View>
    </ScrollView>
  );
};

export default PetCardDetail;
