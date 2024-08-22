// src/api/chatService.ts
import axiosInstance from './axiosInstance';
import { Chat } from '@/types/Chat';

export const fetchChats = async (): Promise<Chat[]> => {
  try {
    const response = await axiosInstance.get('/chats'); // Assuming your API endpoint is '/chats'
    return response.data.chats; // Adjust according to your API response structure
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};
