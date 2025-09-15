import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, MoreVertical } from 'lucide-react';
import { Friend, Message } from '../pages/ChatApp';

interface ChatAreaProps {
  selectedFriend: Friend | null;
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedFriend }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedFriend) {
      // Mock messages for the selected friend
      const mockMessages: Message[] = [
        {
          id: '1',
          text: 'Hey there! How are you doing today?',
          sender: 'friend',
          timestamp: '10:30 AM'
        },
        {
          id: '2',
          text: 'I\'m doing great! Just finished a big project. How about you?',
          sender: 'me',
          timestamp: '10:32 AM'
        },
        {
          id: '3',
          text: 'That\'s awesome! I\'d love to hear more about it. Maybe we can catch up over coffee sometime?',
          sender: 'friend',
          timestamp: '10:35 AM'
        },
        {
          id: '4',
          text: 'Definitely! I\'m free this weekend. What works for you?',
          sender: 'me',
          timestamp: '10:37 AM'
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedFriend]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedFriend) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedFriend) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">Select a Conversation</h3>
          <p className="text-gray-400">Choose a friend from the sidebar to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={selectedFriend.avatar}
                alt={selectedFriend.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {selectedFriend.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white">{selectedFriend.name}</h3>
              <p className="text-sm text-gray-400">
                {selectedFriend.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
              msg.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {msg.sender === 'friend' && (
                <img
                  src={selectedFriend.avatar}
                  alt={selectedFriend.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div className={`px-4 py-2 rounded-2xl ${
                msg.sender === 'me'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-white/10 text-white'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
            <div className={`text-xs text-gray-400 mt-1 ${
              msg.sender === 'me' ? 'text-right mr-2' : 'text-left ml-2'
            }`}>
              {msg.timestamp}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${selectedFriend.name}...`}
              className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-3 rounded-full transition-all ${
              message.trim()
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;