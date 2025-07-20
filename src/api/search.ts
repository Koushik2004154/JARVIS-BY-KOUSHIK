import axios from 'axios';
import { SearchResult } from '../types';

export const searchWeb = async (query: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://google.serper.dev/search',
      {
        q: query,
        num: 3,
      },
      {
        headers: {
          'X-API-KEY': import.meta.env.VITE_SEARCH_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const results = response.data.organic || [];
    if (results.length === 0) return '';

    return results
      .slice(0, 2)
      .map((result: SearchResult) => `${result.title}: ${result.snippet}`)
      .join('\n\n');
  } catch (error) {
    console.error('Search API error:', error);
    return '';
  }
};

export const shouldSearch = (message: string): boolean => {
  const searchKeywords = [
    'what is', 'who is', 'when is', 'where is', 'how to',
    'current', 'latest', 'news', 'weather', 'price', 'stock',
    'today', 'recent', 'update', 'happening'
  ];

  return searchKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );
};