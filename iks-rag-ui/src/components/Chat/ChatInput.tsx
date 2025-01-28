"use client";

import { useState, useRef } from 'react';
import debounce from 'lodash/debounce';

interface ChatInputProps {
  onSend: (message: string) => void;
  onInputChange: (input: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, onInputChange, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  
  const debouncedInputChange = useRef(
    debounce((value: string) => {
      onInputChange(value);
    }, 300)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    debouncedInputChange(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2">
      <textarea
        value={message}
        onChange={handleChange}
        placeholder="Type your message..."
        disabled={isLoading}
        rows={1}
        className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 
          resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow
          text-gray-900 dark:text-gray-100"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
          disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
} 