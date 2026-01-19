import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface PetMapProps {
  latitude: number;
  longitude: number;
  onLocationChange?: (coords: { latitude: number; longitude: number }) => void;
  height?: number;
}

const PetMap: React.FC<PetMapProps> = ({
  latitude,
  longitude,
  onLocationChange,
  height = 260,
}) => {
  const isAndroidExpoGo = Platform.OS === 'android' && !__DEV__;

  return (
    <View style={{ height, borderRadius: 16, overflow: 'hidden' }}>
      <MapView
        provider={
          Platform.OS === 'android' && !isAndroidExpoGo ? PROVIDER_GOOGLE : undefined
        }
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) =>
          onLocationChange && onLocationChange(e.nativeEvent.coordinate)
        }
      >
        <Marker
          draggable
          coordinate={{ latitude, longitude }}
          onDragEnd={(e) =>
            onLocationChange && onLocationChange(e.nativeEvent.coordinate)
          }
        />
      </MapView>
    </View>
  );
};

export default PetMap;
