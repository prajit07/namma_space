import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatApplication = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to Namma Community Chat! How can I help you stay safe online today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string) => {
    const text = input.toLowerCase();
    if (text.includes("scam")) return "If you suspect a scam, do not provide any personal information. You can report the incident on our /report page.";
    if (text.includes("harassment")) return "We take harassment seriously. Please document the incident and submit a report so our community can stay aware.";
    if (text.includes("help")) return "I can provide safety tips or guide you to our reporting tool. What's on your mind?";
    return "Thank you for sharing. Stay vigilant and remember to check our live safety ticker for the latest alerts.";
  };

  return (
    <section className="py-12 bg-[#f0f0f0]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary p-4 border-b-4 border-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-black uppercase text-white tracking-tight">Community Safety Chat</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-none border border-black animate-pulse" />
              <span className="text-xs font-black uppercase text-white">Live Feedback</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={scrollRef}
            className="h-[400px] overflow-y-auto p-6 flex flex-col gap-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
          >
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: m.sender === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 border-2 border-black flex items-center justify-center flex-shrink-0 ${m.sender === "user" ? "bg-accent" : "bg-secondary"}`}>
                      {m.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${m.sender === "user" ? "bg-accent/10" : "bg-white"}`}>
                      {m.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t-4 border-black bg-white">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about digital safety..."
                className="brutalist-input flex-grow"
              />
              <Button 
                onClick={handleSend}
                className="brutalist-button safety-orange h-auto aspect-square p-2"
              >
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatApplication;
