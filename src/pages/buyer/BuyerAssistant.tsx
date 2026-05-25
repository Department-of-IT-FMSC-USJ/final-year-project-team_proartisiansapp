import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { buyerChat } from "@/src/services/gemini";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

const initialMessage: Message = {
  id: "1",
  role: "assistant",
  content:
    "Hi! I'm your Pro-Artisan shopping assistant 👋 Ask me anything — I can help you find handmade products, learn about artisans, or plan a custom order.",
};

export default function BuyerAssistant() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        text: m.content,
      }));

      const reply = await buyerChat(userMsg.content, history);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Sorry, I couldn't process that. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "What handmade gifts are popular?",
    "How do I request a custom order?",
    "What crafts are made in Sri Lanka?",
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 bg-white border-b border-outline-variant/10 sticky top-[72px] z-30">
        <button
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center rounded-full hover:bg-surface-container"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 flex items-center justify-center gap-2 pr-10">
          <Sparkles size={16} className="text-primary-container" />
          <h2 className="text-sm font-black">AI Shopping Assistant</h2>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-40">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex items-start gap-3",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "size-10 rounded-2xl flex items-center justify-center shrink-0 border",
                m.role === "assistant"
                  ? "bg-primary-container/10 border-primary-container/20 text-primary-container"
                  : "bg-white border-outline-variant/20 text-on-surface-variant"
              )}
            >
              {m.role === "assistant" ? (
                <Sparkles size={18} />
              ) : (
                <User size={18} />
              )}
            </div>

            <div className="flex flex-col gap-1 max-w-[80%]">
              <span
                className={cn(
                  "text-[9px] font-black uppercase tracking-widest text-outline px-1",
                  m.role === "user" && "text-right"
                )}
              >
                {m.role === "assistant" ? "Assistant" : "You"}
              </span>
              <div
                className={cn(
                  "p-4 rounded-3xl text-sm leading-relaxed shadow-soft",
                  m.role === "assistant"
                    ? "bg-white border border-outline-variant/20 rounded-tl-sm text-on-surface"
                    : "bg-primary-container text-on-primary-container rounded-tr-sm font-semibold"
                )}
              >
                {m.content}
              </div>
            </div>
          </div>
        ))}

        {/* Loading dots */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3"
            >
              <div className="size-10 rounded-2xl flex items-center justify-center shrink-0 border bg-primary-container/10 border-primary-container/20 text-primary-container">
                <Sparkles size={18} />
              </div>
              <div className="bg-white border border-outline-variant/20 rounded-3xl rounded-tl-sm p-4 shadow-soft">
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="size-2 bg-primary-container/40 rounded-full"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestion chips — only show at start */}
        {messages.length === 1 && (
          <div className="flex flex-col gap-2 pt-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-outline px-1">
              Try asking
            </p>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-left px-4 py-3 bg-white border border-outline-variant/20 rounded-2xl text-sm text-on-surface-variant hover:border-primary-container/30 hover:bg-primary-container/5 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={scrollRef} />
      </main>

      {/* Input bar */}
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-md border-t border-outline-variant/10 p-4 z-30">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about artisan products..."
            className="flex-1 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-container/30 h-14"
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleSend())
            }
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="size-14 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}