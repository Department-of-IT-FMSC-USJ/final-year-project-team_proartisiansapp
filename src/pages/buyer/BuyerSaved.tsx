import { useState } from "react";
import { Trash2 } from "lucide-react";

const mockSaved = [
  {
    id: "1",
    title: "Hand-Forged Damascus Knife",
    artisan: "IronWill Forge",
    price: "Rs.245.00",
    image:
      "https://images.unsplash.com/photo-1579309252119-905f96860f38?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "2",
    title: "Minimalist Ceramic Set",
    artisan: "Earth & Fire Studio",
    price: "Rs.85.00",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "3",
    title: "Hand-Stitched Leather Tote",
    artisan: "Nomad Craft Co.",
    price: "Rs.120.00",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=300",
  },
];

export default function BuyerSaved() {
  const [activeTab, setActiveTab] = useState("Products");
  const [saved, setSaved] = useState(mockSaved);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-24">
      {" "}
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
                className="p-4 border-b border-outline-variant/10 flex items-stretch gap-4"
              >
                <div className="flex-[2] flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-1">
                    <p className="text-on-surface text-base font-black leading-tight">
                      {product.title}
                    </p>
                    <p className="text-outline text-sm">by {product.artisan}</p>
                    <p className="text-primary-container font-black text-lg mt-2">
                      {product.price}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSaved((prev) =>
                        prev.filter((p) => p.id !== product.id),
                      )
                    }
                    className="flex items-center gap-2 bg-surface-container text-on-surface-variant px-4 h-9 rounded-xl text-sm font-bold w-fit mt-4 hover:text-error transition-colors"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
                <div className="size-32 rounded-2xl overflow-hidden shrink-0 border border-outline-variant/10">
                  <img
                    src={product.image}
                    alt={product.title}
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
