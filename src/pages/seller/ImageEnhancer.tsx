import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/components/Button";

export default function ImageEnhancer() {
  const navigate = useNavigate();
  const location = useLocation();

  const originalImage = location.state?.image;

  const [enhancedImage, setEnhancedImage] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!originalImage) return;

    const img = new Image();

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = "brightness(1.1) contrast(1.15) saturate(1.1)";

      ctx.drawImage(img, 0, 0);

      const enhanced = canvas.toDataURL("image/jpeg", 0.95);

      setEnhancedImage(enhanced);
    };

    img.src = originalImage;
  }, [originalImage]);

  return (
    <div className="min-h-screen bg-surface max-w-md mx-auto">
      <header className="flex items-center p-4 bg-white border-b">
        <button
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="font-black text-lg ml-4">AI Image Enhancer</h1>
      </header>

      <div className="p-4 space-y-6">
        <div>
          <h2 className="font-bold mb-2">Original Image</h2>

          <img
            src={originalImage}
            alt="Original"
            className="rounded-2xl w-full"
          />
        </div>

        <div>
          <h2 className="font-bold mb-2">Enhanced Image</h2>

          {enhancedImage && (
            <img
              src={enhancedImage}
              alt="Enhanced"
              className="rounded-2xl w-full"
            />
          )}
        </div>

        <Button
          className="w-full"
          onClick={() =>
            navigate("/seller/add-product", {
              state: {
                ...location.state,
                images: [enhancedImage],
                enhancedImage,
              },
            })
          }
        >
          <Sparkles size={16} />
          Use Enhanced Image
        </Button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
