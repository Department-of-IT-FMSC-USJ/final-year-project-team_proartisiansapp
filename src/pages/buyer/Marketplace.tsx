import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Search, Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Handmade Clay Vase",
    artisan: "Julian Crafts",
    price: "Rs. 4,500",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Wooden Wall Decor",
    artisan: "WoodWorks LK",
    price: "Rs. 6,200",
    image:
      "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Handmade Jewelry",
    artisan: "Ceylon Gems",
    price: "Rs. 2,800",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Traditional Pottery",
    artisan: "Lanka Pottery",
    price: "Rs. 3,900",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600",
  },
];

export default function Marketplace() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-surface max-w-md mx-auto pb-24">
      {/* Header */}
      <header className="flex items-center gap-3 p-4">
        <button
          onClick={() => navigate(-1)}
          className="size-10 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center shadow-soft"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-xl font-black text-on-surface">Marketplace</h1>
      </header>

      {/* Search */}
      <section className="px-4 pb-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>
      </section>

      {/* Products */}
      <section className="px-4 grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl overflow-hidden border border-outline-variant/10 shadow-soft"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 object-cover"
              />

              <button className="absolute top-3 right-3 size-9 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                <Heart size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-black text-sm text-on-surface line-clamp-1">
                {product.name}
              </h3>

              <p className="text-xs text-outline mt-1">{product.artisan}</p>

              <div className="flex items-center justify-between mt-4">
                <p className="text-primary-container font-black text-sm">
                  {product.price}
                </p>

                <button className="px-3 h-9 rounded-xl bg-primary-container text-on-primary-container text-xs font-black">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-24">
          <p className="text-lg font-black text-on-surface">
            No products found
          </p>

          <p className="text-sm text-outline mt-2">
            Try searching something else
          </p>
        </div>
      )}
    </div>
  );
}
