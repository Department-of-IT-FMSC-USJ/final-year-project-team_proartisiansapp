import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "@/src/firebase/firebaseConfig";

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const categories = [
    "All",
    "Home & Living",
    "Jewelry",
    "Pottery",
    "Woodwork",
    "Textiles",
    "Metalwork",
    "Paintings",
    "Handmade Gifts",
  ];

  const filteredProducts = products.filter((product) => {
    if (product.stock <= 0) return false;

    const matchesSearch = product.productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const fetchedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(fetchedProducts);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "wishlist"),
      where("buyerId", "==", auth.currentUser.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ids = snapshot.docs.map((doc) => doc.data().productId);

      setWishlistIds(ids);
    });

    return () => unsubscribe();
  }, []);

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

      {/* Categories */}
      <section className="px-4 pb-5 overflow-x-auto">
        <div className="flex gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 h-10 rounded-2xl text-sm font-black whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-white border border-outline-variant/20 text-on-surface"
              }`}
            >
              {category}
            </button>
          ))}
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
                src={product.imageUrl}
                alt={product.productName}
                className="w-full h-36 object-cover"
              />

              <button
                onClick={async (e) => {
                  e.stopPropagation();

                  const wishlistQuery = query(
                    collection(db, "wishlist"),
                    where("buyerId", "==", auth.currentUser?.uid),
                    where("productId", "==", product.id),
                  );

                  const existing = await getDocs(wishlistQuery);

                  if (!existing.empty) {
                    await deleteDoc(doc(db, "wishlist", existing.docs[0].id));
                    return;
                  }

                  await addDoc(collection(db, "wishlist"), {
                    buyerId: auth.currentUser?.uid,
                    productId: product.id,
                    productName: product.productName,
                    sellerName: product.sellerName,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    createdAt: new Date(),
                  });
                }}
                className="absolute top-3 right-3 size-9 rounded-full bg-white/90 flex items-center justify-center shadow-md"
              >
                <Heart
                  size={16}
                  className={
                    wishlistIds.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-black text-sm text-on-surface line-clamp-1">
                {product.productName}
              </h3>

              <p className="text-xs text-outline mt-1">{product.sellerName}</p>

              <div className="flex items-center justify-between mt-4">
                <p className="text-primary-container font-black text-sm">
                  Rs. {product.price}
                </p>

                <button
                  onClick={() => navigate(`/buyer/product/${product.id}`)}
                  className="px-3 h-9 rounded-xl bg-primary-container text-on-primary-container text-xs font-black"
                >
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
