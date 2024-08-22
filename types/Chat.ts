export type Chat = {
    id: string;
    userName: string;
    avatar: string;  // URL or local image path
    messages: ChatMessage[]
  };

export type ChatPreview = {
    id: string;
    userName: string;
    avatar: string;  // URL or local image path
    lastMessage: string;
    timestamp: string; // ISO string
    status: 'online' | 'offline' | 'unread';
  };

export type ChatMessage = {
    id: string;
    sender: 'user' | 'sender';
    message: string;
    timestamp: string;
  }
  