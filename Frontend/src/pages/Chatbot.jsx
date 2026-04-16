import React, { useState, useRef, useEffect } from 'react';
import { FadeIn } from '../components/animations/FadeIn';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Send, Bot, User } from 'lucide-react';
import { CHAT_HISTORY } from '../utils/constants';
import { cn } from '../utils/cn';

export default function Chatbot() {
  const [messages, setMessages] = useState(CHAT_HISTORY);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', content: 'This is a simulated response based on your query.' }]);
    }, 1500);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sentiq AI Assistant</h1>
        <p className="text-muted-foreground">Ask questions about your data in plain English.</p>
      </div>

      <FadeIn delay={0} className="flex-1">
        <Card className="h-full flex flex-col">
          <CardContent className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-3 text-sm",
                  msg.role === 'user' ? "ml-auto bg-primary text-primary-foreground" : "bg-accent text-foreground"
                )}
              >
                <div className="flex items-center space-x-2 font-medium mb-1">
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  <span>{msg.role === 'user' ? 'You' : 'Sentiq AI'}</span>
                </div>
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            ))}
            {isTyping && (
              <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-3 text-sm bg-accent text-foreground">
                 <div className="flex space-x-1 items-center h-4">
                   <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSend} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Identify top complaints from last week..."
                className="flex-1 h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
