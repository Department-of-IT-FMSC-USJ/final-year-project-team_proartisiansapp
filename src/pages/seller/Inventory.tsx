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
  addDoc,
} from "firebase/firestore";
import { db, auth } from "@/src/firebase/firebaseConfig";

export default function Inventory() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Active");
  const [products, setProducts] = useState<any[]>([]);
  const [soldProducts, setSoldProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        // PRODUCTS
        const productQuery = query(
          collection(db, "products"),
          where("sellerId", "==", auth.currentUser?.uid),
        );

        const productSnapshot = await getDocs(productQuery);

        const fetchedProducts = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(fetchedProducts);

        // SOLD PRODUCTS
        const soldQuery = query(
          collection(db, "soldProducts"),
          where("sellerId", "==", auth.currentUser?.uid),
        );

        const soldSnapshot = await getDocs(soldQuery);

        const fetchedSoldProducts = soldSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSoldProducts(fetchedSoldProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // SOLD BUTTON
  const markAsSold = async (productId: string) => {
    try {
      const product = products.find((p) => p.id === productId);

      if (!product) return;
      if (product.stock <= 0) return;

      const newStock = product.stock - 1;

      // Update stock in products collection
      await updateDoc(doc(db, "products", productId), {
        stock: newStock,
      });

      // Add record to soldProducts collection
      const soldDoc = await addDoc(collection(db, "soldProducts"), {
        sellerId: auth.currentUser?.uid,
        productName: product.productName,
        category: product.category,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        soldAt: new Date(),
      });

      // Update UI
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p)),
      );

      setSoldProducts((prev) => [
        ...prev,
        {
          id: soldDoc.id,
          productName: product.productName,
          category: product.category,
          price: product.price,
          quantity: 1,
          imageUrl: product.imageUrl,
        },
      ]);
    } catch (error) {
      console.error("Error marking product as sold:", error);
    }
  };

  // MAKE ACTIVE
  const makeActive = async (productId: string) => {
    try {
      await updateDoc(doc(db, "products", productId), {
        stock: 1,
      });

      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: 1 } : p)),
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteDoc(doc(db, "products", productToDelete));

      setProducts((prev) => prev.filter((p) => p.id !== productToDelete));

      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // TAB COUNTS
  const activeCount = products.filter((p) => p.stock > 0).length;
  const inactiveCount = products.filter((p) => p.stock === 0).length;
  const soldCount = soldProducts.length;

  // DISPLAY DATA
  const displayedProducts =
    activeTab === "Sold"
      ? soldProducts
      : products.filter((product) =>
          activeTab === "Active" ? product.stock > 0 : product.stock === 0,
        );

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
            onClick={() => navigate("/seller/add-product")}
            className="size-10 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container/20 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-4 gap-8">
          {[
            { name: "Active", count: activeCount },
            { name: "Sold", count: soldCount },
            { name: "Inactive", count: inactiveCount },
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "pb-3 pt-2 text-sm font-bold border-b-2 transition-all",
                activeTab === tab.name
                  ? "border-primary-container text-on-surface"
                  : "border-transparent text-outline",
              )}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>
      </header>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl space-y-5">
            <h3 className="text-lg font-black text-center">Delete Product?</h3>

            <p className="text-sm text-outline text-center">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                }}
                className="flex-1 h-12 rounded-2xl bg-surface-container text-on-surface font-bold"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 h-12 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 p-4 space-y-4">
        {loading && (
          <p className="text-center text-outline">Loading products...</p>
        )}

        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-soft border border-outline-variant/10 overflow-hidden group"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-40 aspect-square shrink-0 overflow-hidden bg-surface-container">
                <img
                  src={product.imageUrl}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={product.productName}
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-on-surface leading-tight mr-2">
                      {product.productName}
                    </h3>

                    {activeTab !== "Sold" && (
                      <span
                        className={cn(
                          "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full",
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700",
                        )}
                      >
                        {product.stock > 0 ? "Active" : "Inactive"}
                      </span>
                    )}
                  </div>

                  <p className="text-primary-container font-black text-lg">
                    Rs.{product.price}
                  </p>

                  {activeTab === "Active" && (
                    <p className="text-[10px] font-bold text-outline">
                      {product.stock} units available
                    </p>
                  )}

                  {activeTab === "Sold" && (
                    <p className="text-[10px] font-bold text-green-700">
                      Quantity Sold: {product.quantity}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-outline-variant/10">
                  {activeTab === "Inactive" ? (
                    <button
                      onClick={() => makeActive(product.id)}
                      className="w-full h-10 flex items-center justify-center bg-primary-container text-[#0f172a] rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                      Make Active
                    </button>
                  ) : activeTab === "Sold" ? (
                    <div className="w-full flex justify-center">
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        Sold Record
                      </span>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          navigate("/add-product", {
                            state: {
                              editMode: true,
                              product,
                            },
                          })
                        }
                        className="flex-1 h-10 flex items-center justify-center gap-2 bg-primary-container text-[#0f172a] rounded-xl text-[10px] font-black uppercase tracking-widest"
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>

                      <button
                        onClick={() => markAsSold(product.id)}
                        className="flex-1 h-10 flex items-center justify-center gap-2 bg-surface-container-high text-on-surface-variant rounded-xl text-[10px] font-black uppercase tracking-widest"
                      >
                        <CheckCircle size={14} />
                        Sold
                      </button>

                      <button
                        onClick={() => {
                          setProductToDelete(product.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
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
