import { Tabs } from 'expo-router';
import React, { useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomHeader from '@/components/headers/CustomHeader';
import { View } from 'react-native';
import BottomSheet from '@/components/CreateOptions';
import HomeHeader from '@/components/headers/HomeHeader';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isSheetVisible, setSheetVisible] = useState(false);

  const handleCreatePress = () => {
    setSheetVisible(true);
  };

  const closeSheet = () => {
    setSheetVisible(false);
  };
  return (
    <>
    {/* <CustomHeader/> */}
    {/* <HomeHeader/> */}

    <Tabs
      screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor:'white'
        }
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home-outline' : 'home-outline'} color={color} />
          ),
        }}
        />
      
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search-outline' : 'search-outline'} color={color} />
          ),
        }}
        />
           <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  position: 'absolute',
                  bottom: 10, // space from bottombar
                  height: 58,
                  width: 58,
                  borderRadius: 58,
                  backgroundColor: Colors[colorScheme ?? 'light'].tint,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TabBarIcon name={focused ? 'add-circle-outline' : 'add-circle-outline'} color={"white"} />
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Prevent default tab action
              handleCreatePress()            
              },
          }}
        />
              <Tabs.Screen
        name="chatlist"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            
            <TabBarIcon name={focused ? 'chatbox-outline' : 'chatbox-outline'} color={color} />
          ),
        }}
      />
      
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-outline' : 'person-outline'} color={color} />
          ),
        }}
      />
    
    </Tabs>
    <BottomSheet visible={isSheetVisible} onClose={closeSheet} />

        </>
  );
}
