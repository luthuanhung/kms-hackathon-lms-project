'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer'; // Ensure this path is correct

interface Message {
  role: 'user' | 'ai';
  text: string;
  image?: string; 
}

export default function SocraticChat({ pageContext }: { pageContext?: string }) {
  const [autoContext, setAutoContext] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi Alex! I'm your Socratic guide. Upload a screenshot or ask a question, and let's work through it together!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Dynamic Page Scraper
  useEffect(() => {
    const updateContext = () => {
      const path = window.location.pathname;
      const pageTitle = document.title;
      const headings = Array.from(document.querySelectorAll('h1, h2'))
        .map(h => (h as HTMLElement).innerText)
        .join(", ");
      setAutoContext(`Path: ${path}. Title: ${pageTitle}. Content: ${headings}`);
    };
    updateContext();
  }, []);

  // 2. Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg = input;
    const userImg = selectedImage;
    // FIX: Define combinedContext inside handleSend
    const combinedContext = `${autoContext} | Manual Context: ${pageContext || "N/A"}`;
    
    // Convert current messages to history format for Gemini
    const historyToSend = messages.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user', // Gemini uses 'model'
      text: m.text
    }));

    // Update UI immediately
    setMessages(prev => [...prev, { role: 'user', text: userMsg, image: userImg || undefined }]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userMsg,
          history: historyToSend, 
          role: 'STUDENT',
          context: combinedContext,
          image: userImg 
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I hit a snag. Let's try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[550px] rounded-2xl shadow-2xl flex flex-col mb-4 border border-blue-100 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles size={20} className="text-blue-200" />
              <span className="font-bold text-sm">Socratic Visual Tutor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded transition">
              <Minimize2 size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                  msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.image && (
                    <img src={msg.image} alt="Uploaded" className="rounded-lg mb-2 max-h-40 w-full object-cover border border-white/20" />
                  )}
                  <MarkdownRenderer content={msg.text} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none">
                  <Loader2 className="animate-spin text-blue-600" size={18} />
                </div>
              </div>
            )}
          </div>

          {selectedImage && (
            <div className="px-4 py-2 bg-blue-50 border-t flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src={selectedImage} className="w-10 h-10 rounded object-cover border-2 border-white shadow-sm" alt="preview" />
                <span className="text-[10px] text-blue-600 font-medium italic">Image attached...</span>
              </div>
              <button onClick={() => setSelectedImage(null)} className="text-blue-400 hover:text-red-500 transition"><X size={16}/></button>
            </div>
          )}

          <div className="p-4 bg-white border-t">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-blue-600 transition"
                title="Upload image"
              >
                <ImageIcon size={20} />
              </button>
              <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for a hint..."
                className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md active:shadow-none"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}