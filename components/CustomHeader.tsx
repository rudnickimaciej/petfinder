import React, { useState } from 'react';
import { Image,View, Text, Pressable, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { images } from "../constants";
import {Link, router} from 'expo-router'

const CustomHeader: React.FC = () => {
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // Set to true if there are new notifications

  return (
    <View
    className="flex-row justify-between items-center px-4 pt-12 pb-4 bg-white shadow-md"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.1,
      elevation: 5, // For Android shadow
    }}
  >
    <View className="relative">
      <Text className="text-3xl font-bold text-center text-white">
        <Text className="text-secondary-200">PetFinder</Text>
      </Text>
      <Image
        source={images.path}
        className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
        resizeMode="contain"
      />
    </View>
    
    <View className="flex-row space-x-4">
      <Link href='/sign-in'>
        <Ionicons name="person-circle-outline" size={24} color="black" />
      </Link>
      <Pressable onPress={() => router.push('/notifications')}>
        <Ionicons name="notifications-outline" size={24} color="black" />
        {hasNewNotifications && (
            <View className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
          )}
      </Pressable>
    </View>
  </View>
  
      );
};

export default CustomHeader;
