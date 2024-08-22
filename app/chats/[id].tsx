import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { format, isToday, isYesterday } from 'date-fns';
import { fetchChatByChatId } from '@/api/chatservicemock';
import { ChatMessage } from '@/types/Chat';
import LoadingIndicator from '@/components/LoadingIndicator'; // Import the loading component
import LoadingIndicator2 from '@/components/LoadingIndicator2';

const ChatScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [avatar, setAvatar] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>();
  const [text, setText] = useState<string>('');
  
  useEffect(() => {
    const loadChats = async () => {
      try {
        const fetchedChat = await fetchChatByChatId(id);
        if (!fetchedChat) {
          setError('Failed to load chats');
          return; 
        }
        setMessages(fetchedChat.messages);
        setUserName(fetchedChat.userName);
        setAvatar(fetchedChat.avatar);
      } catch (err) {
        setError('Failed to load chats');
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [id]);

  const renderMessageItem = ({ item }: { item: ChatMessage }) => (
    <View className={`flex-row my-2 ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`${
          item.sender === 'user' ? 'bg-blue-400' : 'bg-gray-200'
        } rounded-lg p-4 max-w-[80%]`}
      >
        <Text className={`${item.sender === 'user' ? 'text-white' : 'text-black'} text-base`}>
          {item.message}
        </Text>
        <Text className="text-xs text-gray-400 mt-1">
          {format(new Date(item.timestamp), 'hh:mm a')}
        </Text>
      </View>
    </View>
  );

  const renderSectionHeader = (timestamp: string) => {
    if (isToday(new Date(timestamp))) {
      return <Text className="text-gray-500 text-sm text-center my-2">Today</Text>;
    } else if (isYesterday(new Date(timestamp))) {
      return <Text className="text-gray-500 text-sm text-center my-2">Yesterday</Text>;
    } else {
      return null;
    }
  };

  if (loading) {
    return <LoadingIndicator2 message="Fetching chat messages..." />;
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between bg-blue-400 p-4">
        <View className="flex-row items-center mt-7">
          <Image
            source={{ uri: avatar }}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-white text-lg font-bold ml-4">{userName}</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-white text-lg">⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            {renderSectionHeader(item.timestamp)}
            {renderMessageItem({ item })}
          </>
        )}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Field */}
      <View className="flex-row items-center border-t border-gray-300 p-3 bg-white">
        <TouchableOpacity className="mr-2 p-2 bg-gray-200 rounded-full">
          <Text className="text-gray-500 text-base">📷</Text>
        </TouchableOpacity>
        <TextInput
          placeholder={`Write something for ${userName}...`}
          value={text}
          onChangeText={setText}
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-base"
        />
        <TouchableOpacity className="ml-2 p-2 bg-blue-400 rounded-full">
          <Text className="text-white text-base">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
