import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, CheckCircle, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "@/src/firebase/firebaseConfig";

export default function Inventory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const markAsSold = async (productId: string) => {
    try {
      await updateDoc(doc(db, "products", productId), {
        status: "Sold",
        stock: 0,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, status: "Sold", stock: 0 } : p,
        ),
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("sellerId", "==", auth.currentUser?.uid),
        );

        const querySnapshot = await getDocs(q);

        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-outline-variant/10 sticky top-[72px] z-30">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="size-10 flex items-center justify-center rounded-full hover:bg-surface-container"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-black">My Products</h2>
          </div>
          <button
            onClick={() => navigate("/add-product")}
            className="size-10 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container/20 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>
        <div className="flex px-4 gap-8">
          {["Active", "Sold", "Drafts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 pt-2 text-sm font-bold border-b-2 transition-all",
                activeTab === tab
                  ? "border-primary-container text-on-surface"
                  : "border-transparent text-outline",
              )}
            >
              {tab} (
              {tab === "Active"
                ? products.filter((p) => p.status !== "Sold").length
                : tab === "Sold"
                  ? products.filter((p) => p.status === "Sold").length
                  : 0}
              )
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4">
        {loading && (
          <p className="text-center text-outline">Loading products...</p>
        )}
        {products
          .filter((product) =>
            activeTab === "Active"
              ? product.status !== "Sold"
              : activeTab === "Sold"
                ? product.status === "Sold"
                : false,
          )
          .map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-soft border border-outline-variant/10 overflow-hidden group"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-40 aspect-square shrink-0 overflow-hidden bg-surface-container">
                  <img
                    src={product.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={product.name}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-on-surface leading-tight mr-2">
                        {product.name}
                      </h3>
                      <span
                        className={cn(
                          "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full",
                          product.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700",
                        )}
                      >
                        Active
                      </span>
                    </div>
                    <p className="text-primary-container font-black text-lg">
                      Rs.{product.price}
                    </p>
                    {activeTab !== "Sold" && (
                      <p
                        className={cn(
                          "text-[10px] font-bold",
                          product.status === "Low Stock"
                            ? "text-error"
                            : "text-outline",
                        )}
                      >
                        {product.stock} units available
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-outline-variant/10">
                    {activeTab !== "Sold" ? (
                      <>
                        {/* Edit Button */}
                        <button
                          onClick={() =>
                            navigate("/add-product", {
                              state: {
                                editMode: true,
                                product,
                              },
                            })
                          }
                          className="flex-1 h-10 flex items-center justify-center gap-2 bg-primary-container text-[#0f172a] rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
                        >
                          <Edit3 size={14} />
                          Edit
                        </button>

                        {/* Sold Button */}
                        <button
                          onClick={() => markAsSold(product.id)}
                          className="flex-1 h-10 flex items-center justify-center gap-2 bg-surface-container-high text-on-surface-variant rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
                        >
                          <CheckCircle size={14} />
                          Sold
                        </button>

                        {/* Delete Button */}
                        <button className="size-10 flex items-center justify-center bg-error-container/10 text-error rounded-xl hover:bg-error-container/20 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="w-full flex justify-center">
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-[10px] font-black uppercase tracking-widest">
                          Sold Product
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="h-10" />
      </main>
    </div>
  );
}
