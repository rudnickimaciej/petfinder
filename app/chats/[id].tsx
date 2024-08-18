import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { format, isToday, isYesterday } from 'date-fns';

type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    text: "Hey Zesan, it's me, Rebeka. Do you have any meeting tomorrow, we need to discuss about some UI/UX stuff.",
    sender: 'other',
    timestamp: '2023-08-17T14:48:00.000Z',
  },
  {
    id: '2',
    text: "Hey Rebeka, thanks for your interest. I checked my calendar, tomorrow I am free. We can set a meeting at 9.00 am, or you can suggest me a time or set a time for UI/UX meeting.",
    sender: 'user',
    timestamp: '2023-08-17T15:00:00.000Z',
  },
  {
    id: '3',
    text: "Sorry Zesan, I was not online yesterday, are you free tonight at 8.00 pm? If you don't have any problem, we can talk about UI/UX.",
    sender: 'other',
    timestamp: '2023-08-18T07:00:00.000Z',
  },
  {
    id: '4',
    text: "Okay, not a problem.",
    sender: 'user',
    timestamp: '2023-08-18T07:15:00.000Z',
  },
  {
    id: '5',
    text: "Thanks for your patience ❤️. So see you at 8.",
    sender: 'other',
    timestamp: '2023-08-18T08:00:00.000Z',
  },
];

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [text, setText] = useState<string>('');
  const { chatId, userName } = useLocalSearchParams<{ chatId: string; userName: string }>();

  const sendMessage = () => {
    if (text.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text, sender: 'user', timestamp: new Date().toISOString() },
      ]);
      setText('');
    }
  };

  const renderMessageItem = ({ item }: { item: ChatMessage }) => (
    <View className={`flex-row my-2 ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`${
          item.sender === 'user' ? 'bg-blue-400' : 'bg-gray-200'
        } rounded-lg p-4 max-w-[80%]`}
      >
        <Text className={`${item.sender === 'user' ? 'text-white' : 'text-black'} text-base`}>
          {item.text}
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

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between bg-blue-400 p-4">
        <View className="flex-row items-center mt-7">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200',
            }}
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
        <TouchableOpacity className="ml-2 p-2 bg-blue-400 rounded-full" onPress={sendMessage}>
          <Text className="text-white text-base">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
