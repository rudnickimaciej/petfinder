import { View, Text, TouchableOpacity } from 'react-native';

const Chip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 mr-2 mb-2 rounded-full border ${
      active ? 'bg-black border-black' : 'border-gray-300'
    }`}
  >
    <Text className={active ? 'text-white text-sm' : 'text-sm'}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default Chip;