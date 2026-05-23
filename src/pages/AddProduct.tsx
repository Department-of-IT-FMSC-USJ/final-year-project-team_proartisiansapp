import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  Info,
  Trash2,
} from "lucide-react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Select } from "@/src/components/Select";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { db, auth } from "@/src/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";

export default function AddProduct() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const [imageBase64, setImageBase64] = useState("");

  const handleSaveProduct = async () => {
    setErrorMessage("");
    setMissingFields([]);

    const missing = [];

    if (!productName) missing.push("productName");
    if (!category) missing.push("category");
    if (!price) missing.push("price");
    if (!stock) missing.push("stock");
    if (images.length === 0) missing.push("photo");

    if (missing.length > 0) {
      setMissingFields(missing);

      const fieldNames = missing.map((field) => {
        switch (field) {
          case "productName":
            return "Product Name";
          case "category":
            return "Category";
          case "price":
            return "Price";
          case "stock":
            return "Stock Quantity";
          case "photo":
            return "Product Photo";
          default:
            return field;
        }
      });

      setErrorMessage(`❌ Missing: ${fieldNames.join(", ")}`);

      setTimeout(() => {
        setErrorMessage("");
        setMissingFields([]);
      }, 3000);
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        productName,
        category,
        price: Number(price),
        stock: Number(stock),
        description,
        imageUrl: imageBase64,
        createdAt: serverTimestamp(),
        sellerId: auth.currentUser?.uid,
      });

      setErrorMessage("✅ Product posted successfully!");

      setProductName("");
      setCategory("");
      setPrice("");
      setStock("");
      setDescription("");
      setImages([]);
      setImageBase64("");

      setTimeout(() => {
        setErrorMessage("");
        navigate("/inventory");
      }, 2000);
    } catch (error) {
      setErrorMessage("❌ Failed to save product.");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    if (location.state?.editMode) {
      await updateDoc(doc(db, "products", location.state.product.id), {
        productName,
        category,
        price: Number(price),
        stock: Number(stock),
        description,
        imageUrl: imageBase64,
      });
    } else {
      await addDoc(collection(db, "products"), {
        sellerId: auth.currentUser?.uid,
        productName,
        category,
        price: Number(price),
        stock: Number(stock),
        description,
        imageUrl: imageBase64,
        status: "Active",
        createdAt: serverTimestamp(),
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Preview image in UI
    const previewUrl = URL.createObjectURL(file);
    setImages([previewUrl]);

    // Convert image to Base64
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageBase64(base64String);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (location.state?.editMode) {
      // EDIT PRODUCT
      const product = location.state.product;

      setProductName(product.productName || "");
      setCategory(product.category || "");
      setPrice(product.price?.toString() || "");
      setStock(product.stock?.toString() || "");
      setDescription(product.description || "");
      setImages(product.imageUrl ? [product.imageUrl] : []);
      setImageBase64(product.imageUrl || "");
    } else if (location.state) {
      // RETURNING FROM AI DESCRIPTION PAGE
      setProductName(location.state.productName || "");
      setCategory(location.state.category || "");
      setPrice(location.state.price || "");
      setStock(location.state.stock || "");
      setDescription(
        location.state.generatedDescription || location.state.description || "",
      );
      setImages(location.state.images || []);
    }
  }, [location.state]);
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 bg-white border-b border-primary-container/10 sticky top-0 z-30">
        <button
          onClick={() => navigate(-1)}
          className="text-on-surface flex size-10 items-center justify-center rounded-full hover:bg-primary-container/10 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-10">
          Add New Product
        </h2>
      </header>

      <main className="flex-1 p-6 space-y-8">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl text-sm font-semibold animate-pulse">
            {errorMessage}
          </div>
        )}
        {/* Images Upload */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-outline">
            Product Images
          </h3>
          <label
            htmlFor="galleryUpload"
            className={cn(
              "flex flex-col items-center gap-6 rounded-3xl border-2 border-dashed bg-primary-container/5 py-10 cursor-pointer hover:bg-primary-container/10 transition-all",
              missingFields.includes("photo")
                ? "border-red-500"
                : "border-primary-container/30",
            )}
          >
            <input
              type="file"
              accept="image/*"
              id="galleryUpload"
              className="hidden"
              onChange={handleImageChange}
            />

            {images.length > 0 ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={images[0]}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-2xl"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setImages([]);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition"
                >
                  Remove Photo
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="size-14 bg-primary-container/20 rounded-full flex items-center justify-center text-primary-container">
                    <Camera size={28} />
                  </div>

                  <p className="text-on-surface font-black">
                    Upload Product Photo
                  </p>

                  <p className="text-[10px] text-outline font-bold">
                    JPG, PNG up to 10MB
                  </p>
                </div>
              </>
            )}
          </label>
          <div className="flex flex-col items-center">
            <Button
              variant="secondary"
              className="w-full text-xs gap-2 border border-primary-container/20"
            >
              <Sparkles size={16} /> Enhance with AI
            </Button>
            <p className="text-[10px] text-outline font-medium mt-2">
              Make your photo look professional instantly.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Input
            label="Product Name"
            className={
              missingFields.includes("productName") ? "border-red-500" : ""
            }
            placeholder="e.g. Handcrafted Ceramic Vase"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <Select
            label="Category"
            className={
              missingFields.includes("category") ? "border-red-500" : ""
            }
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled selected>
              Select a category
            </option>
            <option>Home & Living</option>
            <option>Jewelry</option>
            <option>Pottery</option>
          </Select>

          <Input
            label="Price (Rs.)"
            className={missingFields.includes("price") ? "border-red-500" : ""}
            placeholder="0.00"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            label="Stock Quantity"
            className={missingFields.includes("stock") ? "border-red-500" : ""}
            placeholder="e.g. 10"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <div className="space-y-4 mt-2">
            <Button
              variant="secondary"
              className="w-full text-xs gap-2 border border-primary-container/20"
              onClick={() =>
                navigate("/description-assistant", {
                  state: {
                    productName,
                    category,
                    price,
                    stock,
                    description,
                    images,
                  },
                })
              }
            >
              <Sparkles size={16} /> Create Description with AI
            </Button>
            <p className="text-[10px] text-center text-outline font-medium">
              AI will analyze your photos to draft a professional product
              description.
            </p>
          </div>

          <div className="space-y-2 opacity-60">
            <p className="text-on-surface text-sm font-semibold">Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 text-sm outline-none min-h-[120px]"
              placeholder="AI-generated description will appear here..."
            />
          </div>
        </div>
      </main>

      <footer className="p-4 bg-white/80 backdrop-blur-md border-t border-outline-variant/10 sticky bottom-0 z-30">
        <Button
          className="w-full h-16 rounded-2xl text-lg shadow-primary-glow"
          onClick={handleSaveProduct}
        >
          Post Product
        </Button>
      </footer>
    </div>
  );
}
