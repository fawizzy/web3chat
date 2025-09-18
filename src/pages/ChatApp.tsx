import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import FriendsList from '../components/FriendsList';
import ChatArea from '../components/ChatArea';
import { useAccount, usePublicClient } from 'wagmi';
// import { parseAbiItem } from 'viem';
import { useGetFriends } from '../hooks/useGetFriends';
export interface Friend {
  id?: string;
  user: string;
  name: string;
  uri: string;
}

export interface Message {
  id?: string
      from: string
      to: string
      message: string
      timestamp: string
}

const ChatApp = () => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const {address} = useAccount()
  const publicClient = usePublicClient();
  const [friends, setFriends] = useState<Friend[]>([])
  const {getFriends} = useGetFriends();

  useEffect(() => {
    if (!publicClient) return

    console.log()

    const getUsers = async () =>{

      const friends = await getFriends()
      console.log(friends)
      
      setFriends(friends);
    }

    getUsers()
  }, [address, getFriends, publicClient]);

  console.log(selectedFriend)


  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <span>Please connect your wallet to use the chat.</span>
      </div>
    );
  }

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
            friends={friends}
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