'use client';
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Send, User, Bot } from 'lucide-react';
import axios from 'axios';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your Web3Thrive AI assistant. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // Auto‐scroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to clean markdown formatting from responses
  const cleanMarkdownFormatting = (text) => {
    if (!text) return '';
    
    // Remove bold formatting
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
    
    // Remove headers (###, ##, #)
    text = text.replace(/#{1,6}\s+(.+)/g, '$1');
    
    // Remove horizontal rules (---, ___, ***)
    text = text.replace(/^(---|\*\*\*|___)$/gm, '');
    
    // Remove bullet points
    text = text.replace(/^\s*[\-\*]\s+/gm, '');
    
    // Remove numbered lists (1., 2., etc)
    text = text.replace(/^\s*\d+\.\s+/gm, '');
    
    // Clean up extra line breaks
    text = text.replace(/\n{3,}/g, '\n\n');
    
    return text.trim();
  };

  const callOpenRouterAPI = async (userMessage) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://openrouter.ai/api/v1/chat/completions',
        headers: {
          'Authorization': 'Bearer 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', // Add your API key here
        //   'HTTP-Referer': 'https://web3thrive.com', // Update with your site URL
        //   'X-Title': 'Web3Thrive', // Update with your site name
          'Content-Type': 'application/json'
        },
        data: {
          model: 'deepseek/deepseek-r1:free',
          messages: [
            // Include conversation history for context
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            // Add the current user message
            {
              role: 'user',
              content: userMessage
            }
          ]
        }
      });

      // Extract the AI's response content and clean markdown formatting
      const aiResponse = response.data.choices[0].message.content;
      const cleanedResponse = cleanMarkdownFormatting(aiResponse);
      return cleanedResponse;
    } catch (error) {
      console.error('Error calling OpenRouter API:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error; // Re-throw for the handleSend function to catch
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    const userMessage = input;
    setInput('');
    setLoading(true);

    try {
      // Call OpenRouter API directly instead of using fetch to /api/chat
      const reply = await callOpenRouterAPI(userMessage);
      
      // Add AI response to chat
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Oops—something went wrong. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Head>
        <title>Chat | Web3Thrive AI</title>
      </Head>

      <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-indigo-600 dark:bg-indigo-700 text-white">
          <Bot className="h-6 w-6 mr-2" />
          <h1 className="text-lg font-semibold">Web3Thrive AI Assistant</h1>
        </header>

        {/* Message List */}
        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50 dark:bg-gray-800">
          {messages.map((msg, i) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={i}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] flex items-start space-x-2 ${
                    isUser ? 'flex-row-reverse' : ''
                  }`}
                >
                  {isUser ? (
                    <User className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <Bot className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  )}
                  <div
                    className={`p-3 rounded-lg break-words ${
                      isUser
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {msg.content.split('\n').map((paragraph, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] flex items-center space-x-2">
                <Bot className="h-5 w-5 text-gray-600 dark:text-gray-300 animate-pulse" />
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg text-gray-400">
                  <span className="loader-dots"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </main>

        {/* Input */}
        <footer className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-2">
            <textarea
              className="flex-1 resize-none px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={1}
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 rounded-full bg-indigo-600 dark:bg-indigo-700 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800 disabled:opacity-50 transition"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </footer>
      </div>

      {/* Loader dots CSS */}
      <style jsx>{`
        .loader-dots {
          display: inline-block;
        }
        .loader-dots::after {
          content: '...';
          animation: blink 1.4s infinite both;
        }
        @keyframes blink {
          0%, 20% {
            color: transparent;
          }
          20%, 40% {
            color: currentColor;
          }
        }
      `}</style>
    </>
  );
}