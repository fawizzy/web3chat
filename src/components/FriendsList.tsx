import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Friend } from '../pages/ChatApp';

interface FriendsListProps {
  friends: Friend[];
  selectedFriend: Friend | null;
  onSelectFriend: (friend: Friend) => void;
}

const FriendsList: React.FC<FriendsListProps> = ({
  friends,
  selectedFriend,
  onSelectFriend,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return friends;
    
    return friends.filter(friend =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [friends, searchQuery]);

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Friends ({filteredFriends.length})
          </h3>
        </div>

        <div className="space-y-1 px-2">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => onSelectFriend(friend)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                selectedFriend?.id === friend.id
                  ? 'bg-purple-600/20 border border-purple-500/30'
                  : ''
              }`}
            >
              <div className="relative">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {friend.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-white truncate">{friend.name}</h4>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {friend.lastMessageTime}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">{friend.lastMessage}</p>
              </div>

              {friend.unreadCount && (
                <div className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {friend.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFriends.length === 0 && searchQuery && (
          <div className="p-6 text-center text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No friends found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsList;