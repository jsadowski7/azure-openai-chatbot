export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const chatHistory: ChatMessage[] = [
    {
        role: 'system',
        content: 'You are a helpful assistant.'
    }
];