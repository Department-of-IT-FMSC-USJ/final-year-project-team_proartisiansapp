import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, User, SmartToyIcon as Bot, CheckCircle, Edit3 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/src/components/Button";
import { cn } from "@/src/lib/utils";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

export default function DescriptionAssistant() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "What is your product made of?" }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI
    setTimeout(() => {
        const nextQ = messages.length === 1 
            ? "What size is the product?" 
            : messages.length === 3 
            ? "Who is this product for?" 
            : null;
        
        if (nextQ) {
            setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: nextQ }]);
        } else {
            setIsGenerating(true);
        }
    }, 800);
  };

  const previewText = "Experience the touch of nature with this beautiful 180×50cm scarf. Hand-woven from 100% organic cotton and dyed with authentic natural indigo, it's the perfect sustainable statement piece for eco-conscious fashion lovers.";

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 bg-white border-b border-outline-variant/10 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="text-on-surface flex size-10 items-center justify-center rounded-full hover:bg-surface-container">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-10">AI Description Assistant</h2>
      </header>

      <main className="flex-1 p-6 space-y-6 pb-64">
        {messages.map((m) => (
          <div key={m.id} className={cn("flex items-start gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn(
                "size-10 rounded-2xl flex items-center justify-center shrink-0 border",
                m.role === "assistant" ? "bg-primary-container/10 border-primary-container/20 text-primary-container" : "bg-white border-outline-variant/20 text-on-surface-variant"
            )}>
              {m.role === "assistant" ? <BotIcon size={20} /> : <User size={20} />}
            </div>
            <div className="flex flex-col gap-1 max-w-[80%]">
              <span className={cn("text-[9px] font-black uppercase tracking-widest text-outline px-1", m.role === "user" && "text-right")}>
                {m.role === "assistant" ? "Assistant" : "You"}
              </span>
              <div className={cn(
                "p-4 rounded-3xl shadow-sm text-sm leading-relaxed",
                m.role === "assistant" 
                    ? "bg-white border border-outline-variant/20 rounded-tl-sm text-on-surface" 
                    : "bg-primary-container text-on-primary-container rounded-tr-sm font-semibold"
              )}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />

        {isGenerating && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-4 pt-6"
             >
                <div className="flex items-center gap-2 px-1">
                    <Sparkles size={16} className="text-primary-container" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-outline">Generated Preview</span>
                </div>
                <div className="p-5 bg-surface-container rounded-[2rem] border border-primary-container/10 italic text-on-surface-variant text-sm leading-relaxed shadow-soft">
                    "{previewText}"
                </div>
             </motion.div>
        )}
      </main>

      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-md border-t border-outline-variant/10 p-4 z-30">
        <AnimatePresence mode="wait">
            {!isGenerating ? (
                <motion.div 
                    key="input"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex gap-2"
                >
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Answer the assistant..."
                        className="flex-1 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-container/30 h-14"
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="size-14 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all"
                    >
                        <Send size={20} />
                    </button>
                </motion.div>
            ) : (
                <motion.div 
                    key="actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                >
                    <Button variant="outline" className="flex-1 rounded-2xl border-outline-variant/30 h-14 text-on-surface">
                        <Edit3 size={18} className="mr-2" /> Edit
                    </Button>
                    <Button className="flex-[2] rounded-2xl h-14 shadow-primary-glow" onClick={() => navigate("/inventory")}>
                        Use This Description
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BotIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
    </svg>
  );
}
