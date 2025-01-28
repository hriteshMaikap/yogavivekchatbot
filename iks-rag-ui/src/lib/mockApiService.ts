import { mockSuggestions, mockResponses, mockPredictedQueries } from './mockData';
import { ChatMessage } from '@/types/chat';

export const mockApiService = {
  async getSuggestions(partialQuery: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSuggestions.filter(s => 
      s.toLowerCase().includes(partialQuery.toLowerCase())
    );
  },

  async getPredictedQuery(partialQuery: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const predicted = Object.entries(mockPredictedQueries).find(([key]) => 
      partialQuery.toLowerCase().startsWith(key)
    );
    return predicted ? predicted[1] : null;
  },

  async getChatResponse(query: string): Promise<ChatMessage> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("query", query);
    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: response.content,
      references: response.references,
      confidence: response.confidence,
      timestamp: new Date()
    };
  }
}; 