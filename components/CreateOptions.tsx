import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // or useRouter from expo-router if using Expo Router
import { useRouter } from 'expo-router';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // Start from off-screen below
  const navigation = useNavigation(); // or const router = useRouter();
  const router = useRouter();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide up to the visible position
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300, // Slide down to hide it
        duration: 200,
        useNativeDriver: true,
      }).start(() => onClose()); // Close the modal when animation is done
    }
  }, [visible]);

  const handleOptionPress = () => {
    onClose();
    router.push('/createmissingpet'); // Replace with the correct route name
  };


  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}>
        <View className="items-center p-5">
          <TouchableOpacity
            className="self-end mb-4 rounded-full p-2"
            onPress={onClose}>
            <FontAwesome5 name="times" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full flex-row items-center justify-center mb-4 p-3 bg-red-100 rounded-md"
            onPress={handleOptionPress}>
            <FontAwesome5 name="paw" size={24} color="red" className="mr-4" />
            <Text className="pregular text-lg text-red-500 ml-3">Zgubiłem zwierzaka</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full flex-row items-center justify-center p-3 bg-green-100 rounded-md"
            onPress={handleOptionPress}>
            <FontAwesome5 name="search" size={24} color="green" className="mr-4" />
            <Text className="font-pregular text-lg text-green-500 ml-3">Znalazłem zwierzaka</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    elevation: 10,
  },
});

export default BottomSheet;
