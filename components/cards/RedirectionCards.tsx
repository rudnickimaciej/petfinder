import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

interface CardProps {
  text: string;
  color: string;
  targetScreen: string;
}

const RedirectionCard: React.FC<CardProps> = ({ text, color, targetScreen }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(targetScreen as never);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`relative bg-${color}-100 rounded-lg p-4 shadow-md m-2 w-[45%]`}
    >
      <Text className={`text-${color}-900 font-semibold text-lg font-pmedium`}>{text}</Text>

      {/* Circle with Arrow */}
      <View className="absolute bottom-2 right-2 bg-white rounded-full p-2">
        <MaterialIcons name="arrow-forward-ios" size={16} color={`${color}-900`} />
      </View>
    </TouchableOpacity>
  );
};

export default RedirectionCard;
