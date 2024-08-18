import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  image: string; // Image URL
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Pet Reported Missing',
    message: 'A new missing pet has been reported in your area. Check the details and help us find them!',
    date: '2024-08-18T14:30:00Z',
    read: false,
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHVzZXIlMjBpbWFnZXxlbnwwfHx8fDE2Mzg0MjE0NzI&ixlib=rb-1.2.1&q=80&w=400', // User Image
  },
  {
    id: '2',
    title: 'Pet Found!',
    message: 'Great news! A missing pet you were tracking has been found safe and sound.',
    date: '2024-08-17T10:15:00Z',
    read: true,
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHVzZXIlMjBpbWFnZXxlbnwwfHx8fDE2Mzg0MjE0NzI&ixlib=rb-1.2.1&q=80&w=400', // User Image
  },
  {
    id: '3',
    title: 'Tip: How to Search Effectively',
    message: 'Make sure to update your search radius and add recent photos to improve your chances of finding your pet.',
    date: '2024-08-16T08:45:00Z',
    read: false,
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIwfHx1c2VyJTIwaW1hZ2V8ZW58MHx8fHwxNjM4NDIxNDcy&ixlib=rb-1.2.1&q=80&w=400', // User Image
  },
  {
    id: '4',
    title: 'Report a Sighting',
    message: 'Saw a stray pet? Report a sighting quickly through the app to help others.',
    date: '2024-08-15T14:00:00Z',
    read: true,
    image: 'https://images.unsplash.com/photo-1572635196237-16d6e64fcfa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDI4fHx1c2VyJTIwaW1hZ2V8ZW58MHx8fHwxNjM4NDIxNDcy&ixlib=rb-1.2.1&q=80&w=400', // User Image
  },
  {
    id: '5',
    title: 'New Search Area Suggested',
    message: 'Based on recent reports, we suggest expanding your search to a new area. Check the map for details.',
    date: '2024-08-14T12:30:00Z',
    read: false,
    image: 'https://images.unsplash.com/photo-1589571894960-20bbe2828e9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHVzZXIlMjBpbWFnZXxlbnwwfHx8fDE2Mzg0MjE0NzI&ixlib=rb-1.2.1&q=80&w=400', // User Image
  },
  {
    id: '6',
    title: 'Profile Complete!',
    message: 'Your pet’s profile is now complete. Share it to increase visibility and get help from the community.',
    date: '2024-08-13T09:00:00Z',
    read: true,
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fHVzZXIlMjBpbWFnZXxlbnwwfHx8fDE2Mzg0MjE0NzI&ixlib=rb-1.2.1&q=80&w=400', // User Image
  },
  {
    id: '7',
    title: 'Reminder: Check Local Shelters',
    message: 'Don’t forget to check with local shelters regularly. They might have found your pet!',
    date: '2024-08-12T17:00:00Z',
    read: true,
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fHVzZXIlMjBpbWFnZXxlbnwwfHx8fDE2Mzg0MjE0NzI&ixlib=rb-1.2.1&q=80&w=400', // User Image
  },
];

const NotificationScreen = () => {
  const renderItem = ({ item }: { item: Notification }) => (
    <Pressable
      className={`flex-row items-center p-4 border-b border-gray-200 ${item.read ? 'bg-white' : 'bg-blue-50'}`}
    >
      <Image
        source={{ uri: item.image }}
        className="w-10 h-10 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className={`text-lg ${item.read ? 'font-normal' : 'font-semibold'}`}>
          {item.title}
        </Text>
        <Text className={`text-sm ${item.read ? 'text-gray-600' : 'text-gray-800'}`}>
          {item.message}
        </Text>
        <Text className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="p-2"
      />
    </View>
  );
};

export default NotificationScreen;
