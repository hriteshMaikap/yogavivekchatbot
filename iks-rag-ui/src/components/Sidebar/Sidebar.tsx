"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface Chat {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const [chats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Understanding Karma Yoga',
      preview: 'What is karma yoga and how can I practice it?',
      timestamp: '2h ago'
    },
    {
      id: '2',
      title: 'Meditation Techniques',
      preview: 'Can you guide me through basic meditation?',
      timestamp: '1d ago'
    }
  ]);

  if (!mounted) {
    return null; // Return null on first render to avoid hydration mismatch
  }

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <Image src="/assets/images/samay.png" alt="SAMAY" width={100} height={100} className="rounded-full object-cover" />
          </div>
          <h1 className="text-xl font-bold text-gray dark:text-white">SAMAY</h1>
        </div>
        <button 
          className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-300 text-gray-800 rounded-lg transition-colors flex items-center justify-center gap-2"
          onClick={() => window.location.reload()}
        >
          <span>+</span> New Chat
        </button>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg 
            text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mb-1 transition-colors"
          >
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{chat.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex justify-between">
              <span className="truncate">{chat.preview}</span>
              <span>{chat.timestamp}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={toggleTheme}
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span>{resolvedTheme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
} 