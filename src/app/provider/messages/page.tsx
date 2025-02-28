'use client';

import { useState } from 'react';
import { FaSearch, FaCircle, FaPaperPlane, FaPaperclip, FaSmile } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'provider' | 'customer';
  isRead: boolean;
}

interface Conversation {
  id: string;
  customerName: string;
  customerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

export default function MessagesManagement() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      customerName: 'John & Sarah Smith',
      customerAvatar: '/avatars/customer1.jpg',
      lastMessage: 'Looking forward to the wedding photoshoot!',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: '1',
          content: 'Hi, we\'re interested in your wedding photography package',
          timestamp: '10:00 AM',
          sender: 'customer',
          isRead: true
        },
        {
          id: '2',
          content: 'Thank you for your interest! Our premium package includes 8 hours of coverage',
          timestamp: '10:15 AM',
          sender: 'provider',
          isRead: true
        },
        {
          id: '3',
          content: 'That sounds perfect! When can we schedule a meeting?',
          timestamp: '10:20 AM',
          sender: 'customer',
          isRead: true
        },
        {
          id: '4',
          content: 'Looking forward to the wedding photoshoot!',
          timestamp: '10:30 AM',
          sender: 'customer',
          isRead: false
        }
      ]
    },
    {
      id: '2',
      customerName: 'Tech Corp Inc.',
      customerAvatar: '/avatars/customer2.jpg',
      lastMessage: 'Could you send the catering menu options?',
      lastMessageTime: '9:45 AM',
      unreadCount: 1,
      isOnline: false,
      messages: [
        {
          id: '1',
          content: 'Hello, we need catering for our annual company meeting',
          timestamp: '9:30 AM',
          sender: 'customer',
          isRead: true
        },
        {
          id: '2',
          content: 'Could you send the catering menu options?',
          timestamp: '9:45 AM',
          sender: 'customer',
          isRead: false
        }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'provider',
      isRead: true
    };

    const updatedConversation = {
      ...selectedConversation,
      lastMessage: newMessage,
      lastMessageTime: newMsg.timestamp,
      messages: [...selectedConversation.messages, newMsg]
    };

    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id ? updatedConversation : conv
    ));
    setSelectedConversation(updatedConversation);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex h-[calc(100vh-12rem)] bg-white rounded-lg shadow">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              <div className="mt-4 relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-5rem)]">
              {filteredConversations.map(conversation => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={conversation.customerAvatar}
                        alt={conversation.customerName}
                        className="w-12 h-12 rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/40';
                        }}
                      />
                      {conversation.isOnline && (
                        <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{conversation.customerName}</h3>
                        <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && (
                          <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={selectedConversation.customerAvatar}
                      alt={selectedConversation.customerName}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/40';
                      }}
                    />
                    {selectedConversation.isOnline && (
                      <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {selectedConversation.customerName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === 'provider'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <FaPaperclip className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <FaSmile className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    <FaPaperPlane className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 