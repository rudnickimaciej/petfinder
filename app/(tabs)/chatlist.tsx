import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatDistanceToNow, parseISO } from 'date-fns';
// import { RootStackParamList } from '../App';
import {router} from 'expo-router'
import { Chat, ChatPreview } from '@/types/Chat';
import CustomHeader from '@/components/headers/CustomHeader';
import ChatlistHeader from '@/components/headers/ChatlistHeader';
import { pl } from 'date-fns/locale';


const chats: ChatPreview[] = [
  {
    id: '1',
    userName: 'Rebeka Ratry',
    lastMessage: 'Thanks for your patience ❤️...',
    timestamp: '2024-08-29T12:48:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200',
    status: 'unread',
  },
  {
    id: '2',
    userName: 'Adrito Rafsan',
    lastMessage: 'Shared a story with you',
    timestamp: '2024-08-25T14:18:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200',
    status: 'offline',
  },
  {
    id: '3',
    userName: 'Tanim Mridha',
    lastMessage: 'Private text for you',
    timestamp: '2024-08-18T13:48:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200',
    status: 'unread',
  },
  {
    id: '4',
    userName: 'Maliha Rahman',
    lastMessage: 'You need your help...',
    timestamp: '2024-01-14T13:48:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200',
    status: 'offline',
  },
];

const ChatListScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderChatItem = ({ item }: { item: ChatPreview }) => {
    const timeAgo = formatDistanceToNow(parseISO(item.timestamp), { addSuffix: true,locale: pl});

    return (
      <TouchableOpacity
        className="flex-row items-center p-4 border-b border-gray-200"
        onPress={() =>router.push("/chats/1")}
      >
        
        <Image
          source={{ uri: item.avatar }}
          className="w-12 h-12 rounded-full"
          resizeMode="cover"
        />
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-center">
            <Text className="font-psemibold text-lg">{item.userName}</Text>
            <Text className="text-xs text-gray-500">{timeAgo}</Text>
          </View>
          <Text
            className={`text-sm ${
              item.status === 'unread' ? 'text-black font-bold' : 'text-gray-500'
            }`}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
     <ChatlistHeader/>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
      />
    </View>
  );
};

export default ChatListScreen;
