import { ChatMessage } from '@/types/chat';
import ReferenceList from './ReferenceList';

interface MessageListProps {
  messages: ChatMessage[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4 px-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            {message.references && message.references.length > 0 && (
              <div className={`mt-2 border-t ${
                message.role === 'user' ? 'border-primary-foreground/20' : 'border-border'
              }`}>
                <ReferenceList references={message.references} isUserMessage={message.role === 'user'} />
              </div>
            )}
            <div className="flex justify-between items-center mt-2 text-xs opacity-70">
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              {message.confidence && (
                <span className="ml-2">
                  Confidence: {(message.confidence * 100).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 