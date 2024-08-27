import React, { useState } from 'react';
import { Image,View, Text, Pressable, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../constants";
import {Link, router} from 'expo-router'

const ChatlistHeader: React.FC = () => {
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // Set to true if there are new notifications

  return (
    <View
    className="flex-row justify-between items-center px-4 pt-12 pb-4 bg-white shadow-md"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 3 },
      shadowOpacity: 3.25,
      shadowRadius: 3.1,
      elevation: 5, // For Android shadow
    }}
  >
    <View className="relative">
      <Text className="text-2xl font-bold text-center text-white">
        <Text className="text-black-200">Search</Text>
      </Text>
    </View>
    
  </View>
  
      );
};

export default ChatlistHeader;
