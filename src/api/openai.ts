import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getChatResponse = async (
  message: string,
  searchContext?: string
): Promise<string> => {
  try {
    const systemPrompt = `You are JARVIS, Tony Stark's AI assistant. Respond in a helpful, intelligent, and slightly witty manner. Keep responses concise but informative. ${
      searchContext ? `Use this search context when relevant: ${searchContext}` : ''
    }`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get AI response');
  }
};