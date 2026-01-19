import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { router } from 'expo-router';
import { Chat, ChatMessage } from '@/types/Chat';
import { fetchChatByChatId } from '@/api/mocks/chatservicemock';

const ChatListScreen: React.FC = () => {
  const [messages, setMessages] = useState<Chat>();
  const [avatar, setAvatar] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  const { chatId } = route.params as { chatId: string };

  useEffect(() => {
    const loadChats = async () => {
      try {
        const fetchedChat = await fetchChatByChatId(chatId);
        console.log(fetchedChat)
        setMessages(fetchedChat);
        setUserName(fetchedChat?.userName);
        setAvatar(fetchedChat?.avatar);
      } catch (err) {
        setError('Failed to load chats');
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, []);

  const renderChatItem = ({ item }: { item: ChatMessage }) => {
    const timeAgo = formatDistanceToNow(parseISO(item.timestamp), { addSuffix: true });

    return (
      <TouchableOpacity
        className="flex-row items-center p-4 border-b border-gray-200"
      >
        <Image
          source={{ uri: avatar }}
          className="w-12 h-12 rounded-full"
          resizeMode="cover"
        />
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">{userName}</Text>
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
      />
    </View>
  );
};

export default ChatListScreen;
