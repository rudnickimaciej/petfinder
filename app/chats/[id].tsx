import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { format, isToday, isYesterday, isSameDay } from 'date-fns';
import { fetchChatByChatId } from '@/api/chatservicemock';
import { Chat, ChatMessage } from '@/types/Chat';
import LoadingIndicator2 from '@/components/loading/LoadingIndicator2';
import { useLoading } from '@/hooks/useLoading';
import { Ionicons } from '@expo/vector-icons';
import { pl } from 'date-fns/locale';

const ChatScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [text, setText] = useState<string>('');
  const { data: chatData, loading, error, load } = useLoading<Chat | undefined>();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    load(() => fetchChatByChatId(id));
  }, [id, load]);

  useEffect(() => {
    if (flatListRef.current && chatData?.messages.length) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatData?.messages]);

  const renderMessageItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const showDateHeader =
      index === 0 || !isSameDay(new Date(item.timestamp), new Date(chatData?.messages[index - 1].timestamp));

    return (
      <>
        {showDateHeader && (
          <Text className="text-gray-500 text-xs text-center my-2">
            {isToday(new Date(item.timestamp))
              ? 'Today'
              : isYesterday(new Date(item.timestamp))
              ? 'Yesterday'
              : format(new Date(item.timestamp), 'd MMMM, yyyy', { locale: pl })}
          </Text>
        )}
        <View className={`flex-row my-2 ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <View
            className={`${
              item.sender === 'user' ? 'bg-blue-400' : 'bg-gray-200'
            } rounded-xl p-4 max-w-[80%] shadow-sm`}
          >
            <Text className={`${item.sender === 'user' ? 'text-white' : 'text-black'} text-base`}>
              {item.message}
            </Text>
            <Text className={`${item.sender === 'user' ? 'text-white' : 'text-black'} text-xs  mt-1`}>
              {format(new Date(item.timestamp), 'HH:mm', { locale: pl })}
            </Text>
          </View>
        </View>
      </>
    );
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
      <View className="flex-row items-center justify-between bg-blue-500 p-4 pt-10 shadow">
        <View className="flex-row items-center">
          <Image
            source={{ uri: chatData?.avatar }}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-white text-lg font-bold ml-4">{chatData?.userName}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={chatData?.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => renderMessageItem({ item, index })}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input Field */}
      <View className="flex-row items-center border-t border-gray-300 p-1 bg-white">
        <View className="flex-1 flex-row items-center bg-gray-200 rounded-full px-4">
          <TextInput
            placeholder={`Aa`}
            value={text}
            onChangeText={setText}
            className="flex-1 text-base"
            multiline={true}
            numberOfLines={1}
            textAlignVertical="top"
          />
          <TouchableOpacity className="ml-2 p-2">
            <Ionicons name="camera-outline" size={28} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="ml-2 p-2 bg-blue-500 rounded-full">
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
