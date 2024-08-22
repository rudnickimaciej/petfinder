import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const MapWithMarkers: React.FC = () => {
  const translateX = useSharedValue(300); // Initial position (hidden off-screen)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateX.value) }],
    };
  });

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = () => {
    if (translateX.value > 150) {
      // If dragged more than halfway, snap open
      translateX.value = 0;
    } else {
      // Otherwise, snap closed
      translateX.value = 300;
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Main content goes here */}
      <Text className="text-center text-lg mt-5">Main Content</Text>

      {/* Sliding Map Button */}
      <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={animatedStyle}
          className="absolute right-0 top-0 bottom-0 w-[300px]"
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title={"Marker Title"}
              description={"Marker Description"}
            />
          </MapView>

          <TouchableOpacity
            onPress={() => (translateX.value = 300)} // Close map button
            className="absolute left-[-50px] top-[50%] w-[50px] h-[50px] bg-red-500 rounded-full justify-center items-center"
          >
            <Text className="text-white">Map</Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default MapWithMarkers;
