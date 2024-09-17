import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface TagProps {
  text: string;
  icon?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

const Tag: React.FC<TagProps> = ({ text, icon, color = 'blue', size = 'medium' }) => {
  // Define Tailwind CSS classes for different sizes
  const sizeClasses = {
    small: {
      text: 'text-xs',
      padding: 'px-2 py-1',
      iconSize: 12,
    },
    medium: {
      text: 'text-sm',
      padding: 'px-3 py-2',
      iconSize: 16,
    },
    large: {
      text: 'text-base',
      padding: 'px-4 py-2',
      iconSize: 20,
    },
  };

  const { text: textClass, padding, iconSize } = sizeClasses[size];

  return (
    <View className={`flex-row items-center bg-${color}-100 ${padding} rounded-full mr-2 mb-2`}>
      {icon && (
        <FontAwesome
          name={icon}
          size={iconSize}
          color={`${color}`} // Adjust based on Tailwind color scale
          className="mr-2"
        />
      )}
      <Text className={`${textClass} text-${color}-600 ml-2`}>{text}</Text>
    </View>
  );
};

export default Tag;
