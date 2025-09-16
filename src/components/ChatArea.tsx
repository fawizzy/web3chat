import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, MoreVertical } from 'lucide-react';
import { Friend, Message } from '../pages/ChatApp';
import { usePublicClient, useWalletClient } from 'wagmi';
import { CHAT_ABI } from '../config/abi';
import { toast } from 'sonner';
import { parseAbiItem } from 'viem';

interface ChatAreaProps {
  selectedFriend: Friend | null;
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedFriend }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {data} = useWalletClient();
  const publicClient = usePublicClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {

    if (!selectedFriend || !publicClient) return
    const fetchMessages = async () => {
      if (selectedFriend && publicClient) {
        const messages = await publicClient.readContract({
          abi: CHAT_ABI,
          functionName: "getMessages",
          address: import.meta.env.VITE_CHAT_CONTRACT,
          args: [data?.account.address, selectedFriend.user]
        });
        setMessages(messages as Message[]);
      }
    };
    fetchMessages();

    const onLogs = (logs: any[]) => {
      // Only update if the message is between the current user and selected friend
      const relevantLogs = logs.filter(
      (log) =>
        (log.args.from === data?.account.address && log.args.to === selectedFriend.user) ||
        (log.args.from === selectedFriend.user && log.args.to === data?.account.address)
      );
      if (relevantLogs.length > 0) {
      // Fetch messages again to update the chat
      publicClient.readContract({
        abi: CHAT_ABI,
        functionName: "getMessages",
        address: import.meta.env.VITE_CHAT_CONTRACT,
        args: [data?.account.address, selectedFriend.user]
      }).then((msgs) => setMessages(msgs as Message[]));
      }
    };

    const unwatch = publicClient.watchEvent({
      address: import.meta.env.VITE_CHAT_CONTRACT,
      event: parseAbiItem("event MessageSent(address indexed from,address indexed to,string message,uint256 timestamp)"),
      onLogs
    });

    return () => {
      unwatch();
    };
  }, [selectedFriend, publicClient, data?.account.address]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedFriend || !data) return;

    try {
      await data.writeContract({
      abi: CHAT_ABI,
      address: import.meta.env.VITE_CHAT_CONTRACT,
      functionName: "sendMessage",
      args: [selectedFriend.user, message]
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }


    const newMessage: Message = {
      text: message,
      sender: data.account.address,
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

  console.log(messages)

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={"https://ipfs.io/ipfs/"+selectedFriend.uri}
                alt={selectedFriend.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              
            </div>
            <div>
              <h3 className="font-semibold text-white">{selectedFriend.name}</h3>
              
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === data?.account.address ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
              msg.sender === data?.account.address ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {msg.sender === selectedFriend.user && (
                <img
                  src={"https://ipfs.io/ipfs/"+selectedFriend.uri}
                  alt={selectedFriend.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div className={`px-4 py-2 rounded-2xl ${
                msg.sender === data?.account.address
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-white/10 text-white'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
            <div className={`text-xs text-gray-400 mt-1 ${
              msg.sender === data?.account.address ? 'text-right mr-2' : 'text-left ml-2'
            }`}>
              {new Date(Number(msg.timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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