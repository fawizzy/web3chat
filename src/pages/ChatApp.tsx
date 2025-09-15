import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import FriendsList from '../components/FriendsList';
import ChatArea from '../components/ChatArea';

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  online: boolean;
  unreadCount?: number;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'friend';
  timestamp: string;
}

const ChatApp = () => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const mockFriends: Friend[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Hey! How are you doing?',
      lastMessageTime: '2m ago',
      online: true,
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'See you tomorrow!',
      lastMessageTime: '15m ago',
      online: true
    },
    {
      id: '3',
      name: 'Carol Davis',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Thanks for the help 😊',
      lastMessageTime: '1h ago',
      online: false
    },
    {
      id: '4',
      name: 'David Wilson',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'The meeting went great!',
      lastMessageTime: '3h ago',
      online: false
    },
    {
      id: '5',
      name: 'Emma Brown',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Let me know when you\'re free',
      lastMessageTime: '1d ago',
      online: true,
      unreadCount: 1
    }
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-bold">Web3Chat</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Friends List Sidebar */}
        <div className="w-80 border-r border-white/10 bg-black/10 backdrop-blur-sm">
          <FriendsList
            friends={mockFriends}
            selectedFriend={selectedFriend}
            onSelectFriend={setSelectedFriend}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1">
          <ChatArea selectedFriend={selectedFriend} />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;