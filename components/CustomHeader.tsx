import React, { useState } from 'react';
import { View, Text, Pressable, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = new Animated.Value(-300); // Start position of the sidebar (off-screen)

  const toggleModal = () => {
    if (isModalVisible) {
      // Slide out to the left
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsModalVisible(false));
    } else {
      setIsModalVisible(true);
      // Slide in from the left
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
        <View className="flex-row justify-between items-center px-4 py-12 bg-white">
          {/* Title in the center */}
          <Text className="text-secondary-200 text-xl font-bold">Pet Finder</Text>
    
          {/* Notification Button */}
          <Pressable onPress={() => console.log('Notification button pressed')}>
            <Ionicons name="notifications" size={24} color="black" />
          </Pressable>
        </View>
      );
};

export default CustomHeader;
