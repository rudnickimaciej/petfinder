import React, { useState } from 'react';
import { Image,View, Text, Pressable, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { images } from "../constants";

const CustomHeader: React.FC = () => {

  return (
        <View className="flex-row justify-between items-center px-4 pt-12 pb-4 bg-white"
           style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.1,
        elevation: 5, // For Android shadow
      }}
        >
          <View className="relative">
            <Text className="text-3xl text-white font-bold text-center">
              <Text className="text-secondary-200">PetFinder</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
    
          <Pressable onPress={() => console.log('Notification button pressed')}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </Pressable>
        </View>
      );
};

export default CustomHeader;
