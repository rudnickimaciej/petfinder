import React from 'react';
import { View, Text, TouchableOpacity, Switch, Image, TextInput, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

const ProfilePage= ({ navigation }: { navigation: any }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const toggleSwitch = () => setIsNotificationsEnabled(previousState => !previousState);

  return (
    <ScrollView className="bg-gray-100">
      <View className="p-6">
        <Text className="text-2xl font-bold">Settings</Text>

        <View className="mt-8">
          <Text className="text-lg font-semibold">Account</Text>

          <TouchableOpacity
            className="mt-4 flex-row justify-between items-center"
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text>Edit Profile</Text>
            <Text className="text-blue-500">{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-4 flex-row justify-between items-center">
            <Text>Change Password</Text>
            <Text className="text-blue-500">{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-4 flex-row justify-between items-center">
            <Text>Facebook</Text>
            <Text className="text-blue-500">{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <Text className="text-lg font-semibold">Notifications</Text>

          <View className="mt-4 flex-row justify-between items-center">
            <Text>Notifications</Text>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#3B82F6' }} // Tailwind gray-300 and blue-500
              thumbColor={isNotificationsEnabled ? '#1E40AF' : '#6B7280'} // Tailwind blue-700 and gray-500
              ios_backgroundColor="#D1D5DB"
              onValueChange={toggleSwitch}
              value={isNotificationsEnabled}
            />
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-lg font-semibold">More</Text>

          <TouchableOpacity className="mt-4 flex-row justify-between items-center">
            <Text>Language</Text>
            <Text className="text-blue-500">{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-4 flex-row justify-between items-center">
            <Text>Country</Text>
            <Text className="text-blue-500">{'>'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-8 p-3 bg-red-500 rounded-lg">
          <Text className="text-white text-center">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default ProfilePage;
