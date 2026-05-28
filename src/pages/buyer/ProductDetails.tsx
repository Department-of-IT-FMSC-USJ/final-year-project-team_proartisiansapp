import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";

import { db } from "@/src/firebase/firebaseConfig";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "products", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        console.error("Failed to fetch product");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface max-w-md mx-auto pb-28">
      {/* Image Section */}
      <div className="relative">
        <img
          src={product.imageUrl}
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
                {product.productName}
              </h1>

              <p className="text-outline mt-2 text-sm">
                by {product.sellerName}
              </p>
            </div>

            <div className="bg-primary-container/10 px-4 py-2 rounded-2xl">
              <span className="text-primary-container font-black text-lg">
                Rs. {product.price}
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
            {product.description}
          </p>
        </section>

        {/* Product Details */}
        <section>
          <h2 className="text-lg font-black mb-4">Product Details</h2>

          <div className="grid grid-cols-2 gap-3">
            <FeatureCard label={product.category} />
            <FeatureCard label={`Stock: ${product.stock}`} />
            <FeatureCard label={product.status} />
            <FeatureCard label="Handmade" />
          </div>
        </section>

        {/* Artisan Card */}
        <section className="bg-white rounded-3xl p-5 border border-outline-variant/10 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary-container text-xl font-black">
              {product.sellerName?.charAt(0)}
            </div>

            <div className="flex-1">
              <h3 className="font-black text-on-surface">
                {product.sellerName}
              </h3>
              <p className="text-sm text-outline">{product.category} Artisan</p>

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
          onClick={() => navigate(`/chat/${product.id}`)}
          className="size-14 rounded-2xl border border-outline-variant/20 flex items-center justify-center"
        >
          <MessageCircle size={22} />
        </button>

        <button
          onClick={() =>
            navigate("/buyer/request-order", {
              state: {
                product,
              },
            })
          }
          className="flex-1 h-14 rounded-2xl bg-primary-container text-on-primary-container font-black flex items-center justify-center gap-2 shadow-soft"
        >
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
