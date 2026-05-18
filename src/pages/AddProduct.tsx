import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Image as ImageIcon, Sparkles, ChevronDown, Info, Trash2 } from "lucide-react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Select } from "@/src/components/Select";
import { motion } from "motion/react";
import { useState } from "react";

export default function AddProduct() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 bg-white border-b border-primary-container/10 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="text-on-surface flex size-10 items-center justify-center rounded-full hover:bg-primary-container/10 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-10">Add New Product</h2>
      </header>

      <main className="flex-1 p-6 space-y-8">
        {/* Images Upload */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-outline">Product Images</h3>
          <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-dashed border-primary-container/30 bg-primary-container/5 py-10">
            <div className="flex flex-col items-center gap-2">
              <div className="size-14 bg-primary-container/20 rounded-full flex items-center justify-center text-primary-container">
                <Camera size={28} />
              </div>
              <p className="text-on-surface font-black">Upload Product Photo</p>
              <p className="text-[10px] text-outline font-bold">JPG, PNG up to 10MB</p>
            </div>
            <div className="flex gap-6">
              <button className="flex flex-col items-center gap-1.5 group">
                <div className="size-12 rounded-2xl bg-white border border-outline-variant/30 flex items-center justify-center text-outline group-hover:border-primary-container group-hover:text-primary-container transition-all">
                  <Camera size={20} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-outline">Camera</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 group">
                <div className="size-12 rounded-2xl bg-white border border-outline-variant/30 flex items-center justify-center text-outline group-hover:border-primary-container group-hover:text-primary-container transition-all">
                  <ImageIcon size={20} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-outline">Gallery</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button variant="secondary" className="w-full text-xs gap-2 border border-primary-container/20">
              <Sparkles size={16} /> Enhance with AI
            </Button>
            <p className="text-[10px] text-outline font-medium mt-2">Make your photo look professional instantly.</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Input label="Product Name" placeholder="e.g. Handcrafted Ceramic Vase" />
          
          <Select label="Category">
            <option value="" disabled selected>Select a category</option>
            <option>Home & Living</option>
            <option>Jewelry</option>
            <option>Pottery</option>
          </Select>

          <Input label="Price (Rs.)" placeholder="0.00" type="number" />

          <div className="space-y-4 mt-2">
            <Button 
                variant="secondary" 
                className="w-full text-xs gap-2 border border-primary-container/20"
                onClick={() => navigate("/description-assistant")}
            >
              <Sparkles size={16} /> Create Description with AI
            </Button>
            <p className="text-[10px] text-center text-outline font-medium">AI will analyze your photos to draft a professional product description.</p>
          </div>

          <div className="space-y-2 opacity-60">
            <p className="text-on-surface text-sm font-semibold">Description</p>
            <div className="min-h-[120px] rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 italic text-xs text-outline leading-relaxed">
              The AI-generated description will appear here...
            </div>
          </div>
        </div>
      </main>

      <footer className="p-4 bg-white/80 backdrop-blur-md border-t border-outline-variant/10 sticky bottom-0 z-30">
        <Button className="w-full h-16 rounded-2xl text-lg shadow-primary-glow" onClick={() => navigate("/inventory")}>
          Post Product
        </Button>
      </footer>
    </div>
  );
}
