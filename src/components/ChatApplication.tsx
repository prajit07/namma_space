import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, ShieldAlert, Flag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  username: string;
  text: string;
  created_at: string;
}

const ChatApplication = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState<string | null>(localStorage.getItem("chat-username"));
  const [tempUsername, setTempUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!username) return;

    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(100);

      if (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages");
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.find(m => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [username]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleJoin = () => {
    if (!tempUsername.trim()) {
      toast.error("Please enter a username");
      return;
    }
    const cleanName = tempUsername.trim().substring(0, 20);
    localStorage.setItem("chat-username", cleanName);
    setUsername(cleanName);
    toast.success(`Welcome, ${cleanName}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("chat-username");
    setUsername(null);
    setMessages([]);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !username) return;

    setIsLoading(true);
    const { error } = await supabase.from("messages").insert([
      {
        username: username,
        text: inputValue.trim(),
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } else {
      setInputValue("");
    }
    setIsLoading(false);
  };

  if (!username) {
    return (
      <section className="py-12 bg-[#f0f0f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary border-2 border-black flex items-center justify-center">
                <ShieldAlert className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Join Global Chat</h3>
            </div>
            <p className="font-bold mb-6">Enter a username to start chatting with the community. No email or password required.</p>
            <div className="space-y-4">
              <Input
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                placeholder="Pick a username..."
                className="brutalist-input"
                maxLength={20}
              />
              <Button 
                onClick={handleJoin}
                className="brutalist-button safety-orange w-full py-4 text-lg"
              >
                JOIN COMMUNITY
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#f0f0f0]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary p-4 border-b-4 border-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-white tracking-tight leading-none">Global Safety Forum</h3>
                <span className="text-[10px] font-black uppercase text-white/80">Logged in as {username}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-none border border-black animate-pulse" />
                <span className="text-xs font-black uppercase text-white">Live</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-white hover:text-black transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={scrollRef}
            className="h-[500px] overflow-y-auto p-6 flex flex-col gap-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
          >
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground font-bold italic">
                  No messages yet. Be the first to start the conversation!
                </div>
              ) : (
                messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.username === username ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex flex-col gap-1 max-w-[85%] ${m.username === username ? "items-end" : "items-start"}`}>
                      <div className="flex items-center gap-2 px-1">
                        <span className="text-xs font-black uppercase tracking-wider">{m.username}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex gap-2 group">
                        <div className={`p-4 border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-grow ${m.username === username ? "bg-accent/10" : "bg-white"}`}>
                          {m.text}
                        </div>
                        {m.username !== username && (
                          <Link 
                            to={`/report?target=${encodeURIComponent(m.username)}&platform=Global Chat`}
                            className="opacity-0 group-hover:opacity-100 transition-opacity self-center p-2 bg-destructive border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                            title="Report User"
                          >
                            <Flag size={16} className="text-white" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t-4 border-black bg-white">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Share a safety tip or ask the community..."
                className="brutalist-input flex-grow"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="brutalist-button safety-orange h-auto aspect-square p-3"
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
