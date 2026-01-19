import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from 'react-native';

const AnimalChip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center px-4 py-2 mr-2 mb-2 rounded-full border ${
      active ? 'bg-black border-black' : 'border-gray-300'
    }`}
  >
    <Ionicons
      name="paw-outline"
      size={16}
      color={active ? 'white' : 'black'}
      style={{ marginRight: 6 }}
    />
    <Text className={active ? 'text-white text-sm' : 'text-sm'}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default AnimalChip;