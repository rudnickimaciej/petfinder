// src/api/chatService.ts (Mock version)
import { Chat } from '@/types/Chat';


const mockChats: Chat[] = 
    [
    {
        id: "1",
        userName: "Rebeka Ratry",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=200",
        messages: [
          {
            id: 'msg1',
            sender: 'sender',
            message: 'Cześć, znalazłem psa w parku na Nowowiejskiej. Czy to może być Twój?',
            timestamp: '2023-08-17T14:50:00.000Z',
          },
          {
            id: 'msg2',
            sender: 'user',
            message: 'Cześć, dziękuję za wiadomość. Mój pies zaginął wczoraj, to możliwe. Jak wygląda ten pies?',
            timestamp: '2023-08-17T14:52:00.000Z',
          },
          {
            id: 'msg3',
            sender: 'sender',
            message: 'To mały biały pies z czarną obrożą. Wygląda na trochę przestraszonego.',
            timestamp: '2023-08-18T14:50:00.000Z',
          },
          {
            id: 'msg4',
            sender: 'user',
            message: 'Tak, to na pewno mój pies! Jak mogę go odebrać?',
            timestamp: '2023-08-18T14:52:00.000Z',
          },
          {
            id: 'msg5',
            sender: 'sender',
            message: 'Jestem w parku, przy głównym wejściu. Mogę poczekać na Ciebie.',
            timestamp: '2023-08-19T16:50:00.000Z',
          },
          {
            id: 'msg6',
            sender: 'user',
            message: 'Już idę, będę za 10 minut. Dziękuję za pomoc!',
            timestamp: '2023-08-19T16:55:00.000Z',
          },
        ]
        
    }
  
  ]

export const fetchChatByChatId = async (chatId: string): Promise<Chat | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        console.log(chatId)
      resolve(mockChats.find(c=>c.id == chatId));
    }, 500); // Simulate a delay like a real network request
  });
};

// export const fetchChatById = async (chatId: string): Promise<Chat | undefined> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const chat = mockChats.find(c => c.id === chatId);
//       resolve(chat);
//     }, 1000); // Simulate a delay like a real network request
//   });
// };

// export const fetchMessagesByChatId = async (chatId: string): Promise<ChatMessage[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const messages = mockMessages[chatId] || [];
//       resolve(messages);
//     }, 1000); // Simulate a delay like a real network request
//   });
// };
