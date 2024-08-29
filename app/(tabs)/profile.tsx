import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Image, ScrollView, ImageBackground } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'; // Icons import

const ProfilePage = ({ navigation }: { navigation: any }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isSearching, setIsSearching] = useState(true); // Example state for activity badge

  const toggleSwitch = () => setIsNotificationsEnabled(previousState => !previousState);

  return (
    <ScrollView className="bg-white h-full">
      {/* Header Section with Background */}
      <ImageBackground
        source={{ uri: 'https://img.freepik.com/darmowe-wektory/gradientowe-dynamiczne-niebieskie-linie-tla_23-2148995756.jpg' }} // Replace with a suitable background image URL
        className="w-full h-60 justify-center items-center"
        resizeMode="cover"
      >
        {/* Profile Picture and Info */}
        <View className="items-center">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200' }} // Replace with the actual profile picture URL
            className="w-24 h-24 rounded-full border-2 border-white"
          />
          <Text className="text-3xl font-psemibold text-white mt-4">Maciej Rudnicki</Text>

          {/* Activity Badge */}
          {isSearching && (
            <View className="mt-2 bg-green-100 py-2 px-4 rounded-full flex-row items-center">
              <Ionicons name="ribbon-outline" size={20} color="green" />
              <Text className="font-pregular text-green-700 text-sm ml-2">Aktywny Poszukiwacz</Text>
            </View>
          )}
        </View>
      </ImageBackground>

      <View className="p-6 items-center">
        {/* Menu Options */}
        <View className="w-full">
          <Text className="font-pbold text-xl font-semibold text-gray-800 mb-4">Moje konto</Text>

          <TouchableOpacity className="flex-row items-center py-3">
            <Ionicons name="paw-outline" size={24} color="black" />
            <Text className="font-pregular text-black-700 text-lg ml-4">My Missing Pet Reports</Text>
          </TouchableOpacity>
          <View className="h-px bg-gray-200 w-full my-2" />

          <TouchableOpacity className="flex-row items-center py-3">
            <MaterialIcons name="history" size={24} color="black" />
            <Text className="font-pregular text-black-700 text-lg ml-4">Historia wyszukiwania</Text>
          </TouchableOpacity>
          <View className="h-px bg-gray-200 w-full my-2" />

          <TouchableOpacity className="flex-row items-center py-3">
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text className="font-pregular text-black-700 text-lg ml-4">Ulubione</Text>
          </TouchableOpacity>
          <View className="h-px bg-gray-200 w-full my-2" />

          <TouchableOpacity className="flex-row items-center py-3">
            <Ionicons name="share-social-outline" size={24} color="black" />
            <Text className="font-pregular text-black-700 text-lg ml-4">Tell Your Friend</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 w-full">
          <Text className="font-pbold text-xl font-semibold text-gray-800 mb-4">Ustawienia</Text>

          <TouchableOpacity className="flex-row items-center py-3">
            <Ionicons name="settings-outline" size={24} color="black" />
            <Text className="font-pregular text-black-700 text-lg ml-4">Ustawienia</Text>
          </TouchableOpacity>
          <View className="h-px bg-gray-200 w-full my-2" />

          {/* Notifications Toggle */}
          <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
              <Ionicons name="notifications-outline" size={24} color="black" />
              <Text className="font-pregular text-black-700 text-lg ml-4">Powiadomienia</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <View className="h-px bg-gray-200 w-full my-2" />

        <TouchableOpacity className="mt-8" onPress={() => {/* Add logout functionality here */}}>
          <Text className="font-pregular text-red-500 text-lg text-center">Wyloguj się</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
