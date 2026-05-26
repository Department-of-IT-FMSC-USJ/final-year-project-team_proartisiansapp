import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MessageCircle, ChevronRight } from "lucide-react";

const chats = [
  {
    id: 1,
    name: "Julian Crafts",
    lastMessage: "Yes absolutely. We can customize it.",
    time: "2m ago",
    unread: 2,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "WoodWorks LK",
    lastMessage: "Your order is now in production.",
    time: "1h ago",
    unread: 0,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Ceylon Pottery",
    lastMessage: "Thank you for your purchase ❤️",
    time: "Yesterday",
    unread: 0,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function ChatList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="size-11 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center shadow-soft"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-black text-on-surface">Messages</h1>

          <p className="text-sm text-outline">Chat with artisans</p>
        </div>
      </header>

      {/* Search */}
      <section className="px-4 pb-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>
      </section>

      {/* Chats */}
      <section className="px-4 space-y-3">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => navigate("/chat")}
            className="w-full bg-white rounded-3xl p-4 border border-outline-variant/10 shadow-soft flex items-center gap-4 hover:bg-surface-container-low transition-all"
          >
            {/* Profile */}
            <div className="relative">
              <img
                src={chat.image}
                alt={chat.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />

              <div className="absolute bottom-1 right-1 size-3 rounded-full bg-green-500 border-2 border-white"></div>
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-sm text-on-surface">
                  {chat.name}
                </h2>

                <p className="text-[10px] text-outline">{chat.time}</p>
              </div>

              <p className="text-sm text-outline mt-1 line-clamp-1">
                {chat.lastMessage}
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-2">
              {chat.unread > 0 && (
                <div className="min-w-6 h-6 px-2 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-black">
                  {chat.unread}
                </div>
              )}

              <ChevronRight size={16} className="text-outline opacity-40" />
            </div>
          </button>
        ))}
      </section>

      {/* Empty State Example */}
      {chats.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-32">
          <div className="size-20 rounded-3xl bg-white border border-outline-variant/10 flex items-center justify-center shadow-soft mb-5">
            <MessageCircle size={34} className="text-outline" />
          </div>

          <h2 className="text-lg font-black">No conversations yet</h2>

          <p className="text-sm text-outline mt-2">
            Start chatting with artisans
          </p>
        </div>
      )}
    </div>
  );
}
