import React, { useRef, useState } from 'react';
import { images } from '../constants';
import {
  SafeAreaView,
  Image,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useNavigation, router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#282534', white: '#fff' };

type SlideProps = {
  item: {
    id: string;
    image: any;
    title: string;
    subtitle: string;
  };
};


const slides = [
  {
    id: '1',
    image: images.image1,
    title: 'Discover Lost Pets Nearby',
    subtitle: 'Locate lost pets and help reunite them with their owners.',
  },
  {
    id: '2',
    image: images.image2,
    title: 'Post and Share Alerts',
    subtitle: 'Create alerts for missing pets',
  },
  {
    id: '3',
    image: images.image3,
    title: 'Join a Caring Community',
    subtitle: 'Connect with other pet lovers.',
  },
];

const Slide: React.FC<SlideProps> = ({ item }) => {
  return (
    <View className="items-center">
      <Image source={item?.image} className="h-3/4" style={{ width, resizeMode: 'contain' }} />
      <View>
        <Text className="text-white text-lg font-bold mt-5 text-center">{item?.title}</Text>
        <Text className="text-white text-sm mt-2 text-center leading-6" lineBreakMode='middle'   ellipsizeMode="tail"

        >{item?.subtitle}</Text>
      </View>
    </View>
  );
};

type OnboardingScreenProps = {
  navigation: any;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const navigation2 = useNavigation();

  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View className="h-1/4 justify-between px-5">
        <View className="flex-row justify-center mt-5">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-1 w-2.5 bg-gray-400 mx-1 rounded ${currentSlideIndex === index ? 'bg-white w-6' : ''}`}
            />
          ))}
        </View>
        <View className="mb-5">
          {currentSlideIndex === slides.length - 1 ? (
            <View className="h-12">
              <TouchableOpacity
                className="bg-white h-full rounded justify-center items-center"
                onPress={() => router.push('/home')}
              >
                <Text className="font-bold text-base">GET STARTED</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row">
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 h-12 rounded justify-center items-center border border-white"
                style={{ backgroundColor: 'transparent' }}
                onPress={skip}
              >
                <Text className="font-bold text-base text-white">SKIP</Text>
              </TouchableOpacity>
              <View className="w-4" />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                className="flex-1 h-12 rounded justify-center items-center bg-white"
              >
                <Text className="font-bold text-base">NEXT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
