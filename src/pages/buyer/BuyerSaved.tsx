import { useEffect, useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db, auth } from "@/src/firebase/firebaseConfig";

export default function BuyerSaved() {
  const [activeTab, setActiveTab] = useState("Products");
  const [saved, setSaved] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "wishlist"),
      where("buyerId", "==", auth.currentUser?.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSaved(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-24">
      {" "}
      <header className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="size-10 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center shadow-soft"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-xl font-black text-on-surface">Wishlist</h1>
      </header>
      <div className="bg-white sticky top-[72px] z-10 border-b border-outline-variant/10">
        <div className="flex px-4 gap-8">
          {[`Products (${saved.length})`, "Artisans"].map((tab) => {
            const label = tab.split(" ")[0];
            const isActive = activeTab === label;
            return (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-all ${
                  isActive
                    ? "border-primary-container text-on-surface"
                    : "border-transparent text-outline"
                }`}
              >
                <p className="text-sm font-black tracking-[0.015em]">{tab}</p>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1">
        {activeTab === "Products" ? (
          <div className="flex flex-col">
            {saved.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center text-outline">
                <p className="text-sm">Your wishlist is empty.</p>
              </div>
            )}
            {saved.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/buyer/product/${product.productId}`)}
                className="p-4 border-b border-outline-variant/10 flex items-stretch gap-4 cursor-pointer"
              >
                <div className="flex-[2] flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-1">
                    <p className="text-on-surface text-base font-black leading-tight">
                      {product.productName}
                    </p>
                    <p className="text-outline text-sm">
                      by {product.sellerName}
                    </p>
                    <p className="text-primary-container font-black text-lg mt-2">
                      {product.price}
                    </p>
                  </div>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await deleteDoc(doc(db, "wishlist", product.id));
                    }}
                    className="flex items-center gap-2 bg-surface-container text-on-surface-variant px-4 h-9 rounded-xl text-sm font-bold w-fit mt-4 hover:text-error transition-colors"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
                <div className="size-32 rounded-2xl overflow-hidden shrink-0 border border-outline-variant/10">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center text-outline">
            <p className="text-sm">You haven't followed any artisans yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
