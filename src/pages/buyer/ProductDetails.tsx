import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  ShoppingBag,
  Star,
} from "lucide-react";

export default function ProductDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface max-w-md mx-auto pb-28">
      {/* Image Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=1200"
          alt="Product"
          className="w-full h-[340px] object-cover"
        />

        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="size-11 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center shadow-md"
          >
            <ArrowLeft size={20} />
          </button>

          <button className="size-11 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center shadow-md">
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6">
        {/* Product Info */}
        <section>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-on-surface leading-tight">
                Handmade Clay Vase
              </h1>

              <p className="text-outline mt-2 text-sm">by Julian Crafts</p>
            </div>

            <div className="bg-primary-container/10 px-4 py-2 rounded-2xl">
              <span className="text-primary-container font-black text-lg">
                Rs. 4,500
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <Star size={14} className="fill-yellow-500 text-yellow-500" />

              <span className="text-xs font-black text-yellow-700">4.9</span>
            </div>

            <span className="text-sm text-outline">124 Reviews</span>
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-lg font-black mb-3">Description</h2>

          <p className="text-sm leading-7 text-outline">
            This handcrafted clay vase is made by skilled Sri Lankan artisans
            using traditional pottery techniques. Designed for modern and rustic
            interiors, it adds warmth and authenticity to any space.
          </p>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-lg font-black mb-4">Features</h2>

          <div className="grid grid-cols-2 gap-3">
            <FeatureCard label="Handmade" />
            <FeatureCard label="Eco Friendly" />
            <FeatureCard label="Customizable" />
            <FeatureCard label="Clay Material" />
          </div>
        </section>

        {/* Artisan Card */}
        <section className="bg-white rounded-3xl p-5 border border-outline-variant/10 shadow-soft">
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Artisan"
              className="w-16 h-16 rounded-2xl object-cover"
            />

            <div className="flex-1">
              <h3 className="font-black text-on-surface">Julian Crafts</h3>

              <p className="text-sm text-outline">
                Traditional Pottery Artisan
              </p>

              <div className="flex items-center gap-2 mt-2">
                <Star size={14} className="fill-yellow-500 text-yellow-500" />

                <span className="text-xs font-bold">4.9 Seller Rating</span>
              </div>
            </div>
          </div>

          <button className="w-full h-12 rounded-2xl border border-outline-variant/20 mt-5 font-bold">
            View Artisan Profile
          </button>
        </section>
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-outline-variant/10 p-4 flex gap-3">
        <button
          onClick={() => navigate("/chat/:id")}
          className="size-14 rounded-2xl border border-outline-variant/20 flex items-center justify-center"
        >
          <MessageCircle size={22} />
        </button>

        <button className="flex-1 h-14 rounded-2xl bg-primary-container text-on-primary-container font-black flex items-center justify-center gap-2 shadow-soft">
          <ShoppingBag size={20} />
          Request Order
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-outline-variant/10 p-4 text-center shadow-soft">
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}
