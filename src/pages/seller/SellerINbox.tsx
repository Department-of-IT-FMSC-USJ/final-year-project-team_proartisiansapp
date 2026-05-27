import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";

const chats = [
  {
    id: 1,
    buyer: "Kasun Rodrigo",
    lastMessage: "Can you customize this vase?",
    time: "2m ago",
    unread: 1,
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 2,
    buyer: "Nimal Perera",
    lastMessage: "Thank you!",
    time: "1h ago",
    unread: 0,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

export default function SellerInbox() {
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
          <h1 className="text-2xl font-black">Customer Chats</h1>

          <p className="text-sm text-outline">Messages from buyers</p>
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
            placeholder="Search buyers..."
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>
      </section>

      {/* Chat List */}
      <section className="px-4 space-y-3">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => navigate("/chat")}
            className="w-full bg-white rounded-3xl p-4 border border-outline-variant/10 shadow-soft flex items-center gap-4"
          >
            <img
              src={chat.image}
              alt={chat.buyer}
              className="w-16 h-16 rounded-2xl object-cover"
            />

            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-sm">{chat.buyer}</h2>

                <p className="text-[10px] text-outline">{chat.time}</p>
              </div>

              <p className="text-sm text-outline mt-1 line-clamp-1">
                {chat.lastMessage}
              </p>
            </div>

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
    </div>
  );
}
