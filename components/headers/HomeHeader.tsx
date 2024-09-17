import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons'; // Importing prettier icons

const HomeHeader: React.FC = () => {
  return (
    <View className="flex-row justify-between items-center px-4 pb-4 pt-14 bg-white shadow">
      
      {/* Location Selector */}
      <TouchableOpacity className="flex-row items-center">
        <Ionicons name="location-outline" size={22} color="#5a95ff" />
        <Text className="ml-2 text-gray-800 text-base">Pułtusk</Text>
        <Ionicons name="chevron-down-outline" size={20} color="gray" className="ml-1" />
      </TouchableOpacity>
      
      {/* Max Range Indicator */}
      <TouchableOpacity className="flex-row items-center bg-gray-200 rounded-full px-4 py-1">
        <Feather name="map-pin" size={16} color="#5a95ff" className="mr-1" />
        <Text className="text-gray-800 text-base ml-1">15km</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
