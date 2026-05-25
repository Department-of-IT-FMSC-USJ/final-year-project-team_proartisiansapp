import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { generateProductDescription } from "@/src/services/gemini";

export default function DescriptionAssistant() {
  const navigate = useNavigate();
  const location = useLocation();

  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [specialFeatures, setSpecialFeatures] = useState("");

  const [loading, setLoading] = useState(false);

  const [generatedTitle, setGeneratedTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");
  const [seoTags, setSeoTags] = useState("");

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const details = `
Material: ${material}
Size: ${size}
Target Customer: ${targetCustomer}
Special Features: ${specialFeatures}

Generate the following separately:

1. Product Title
2. Short Description
3. Full Description
4. Key Features (bullet style)
5. SEO Tags

Format clearly with headings.
`;

      const aiResponse =
        (await generateProductDescription(
          location.state?.productName || "Product",
          location.state?.category || "General",
          details,
        )) || "";

      // Split response
      const titleMatch = aiResponse.match(
        /Product Title:(.*?)(Short Description:|$)/s,
      );
      const shortMatch = aiResponse.match(
        /Short Description:(.*?)(Full Description:|$)/s,
      );
      const fullMatch = aiResponse.match(
        /Full Description:(.*?)(Key Features:|$)/s,
      );
      const featuresMatch = aiResponse.match(
        /Key Features:(.*?)(SEO Tags:|$)/s,
      );
      const seoMatch = aiResponse.match(/SEO Tags:(.*)/s);

      setGeneratedTitle(titleMatch?.[1]?.trim() || "");
      setShortDescription(shortMatch?.[1]?.trim() || "");
      setFullDescription(fullMatch?.[1]?.trim() || aiResponse);
      setKeyFeatures(featuresMatch?.[1]?.trim() || "");
      setSeoTags(seoMatch?.[1]?.trim() || "");
    } catch (error: any) {
      console.error("Gemini Error:", error);

      setFullDescription(`Failed to generate description: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center p-4 bg-white border-b border-outline-variant/10 sticky top-0 z-30">
        <button
          onClick={() => navigate(-1)}
          className="text-on-surface flex size-10 items-center justify-center rounded-full hover:bg-surface-container"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-10">
          AI Description Assistant
        </h2>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6 pb-32">
        {/* Product info */}
        <div className="bg-white rounded-3xl p-5 border border-outline-variant/10 shadow-soft">
          <p className="text-xs text-outline font-bold uppercase tracking-widest mb-2">
            Product Context
          </p>
          <p className="font-black">{location.state?.productName}</p>
          <p className="text-sm text-outline">{location.state?.category}</p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <Input
            label="Material"
            placeholder="e.g. Organic cotton, ceramic, wood"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />

          <Input
            label="Size / Dimensions"
            placeholder="e.g. 180x50cm"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />

          <Input
            label="Target Customer"
            placeholder="e.g. Gift buyers, home decor lovers"
            value={targetCustomer}
            onChange={(e) => setTargetCustomer(e.target.value)}
          />

          <div>
            <p className="text-sm font-semibold mb-2">Special Features</p>
            <textarea
              value={specialFeatures}
              onChange={(e) => setSpecialFeatures(e.target.value)}
              className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 text-sm outline-none min-h-[100px]"
              placeholder="e.g. Handmade, eco-friendly dyes, custom made"
            />
          </div>

          <Button
            className="w-full h-14 rounded-2xl"
            onClick={handleGenerate}
            disabled={loading}
          >
            <Sparkles size={18} className="mr-2" />
            {loading ? "Generating..." : "Generate with AI"}
          </Button>
        </div>

        {/* Output */}
        {fullDescription && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <Section title="Product Title" content={generatedTitle} />
            <Section title="Short Description" content={shortDescription} />
            <Section title="Full Description" content={fullDescription} />
            <Section title="Key Features" content={keyFeatures} />
            <Section title="SEO Tags" content={seoTags} />
          </motion.div>
        )}
      </main>

      {/* Bottom actions */}
      {fullDescription && (
        <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-md border-t border-outline-variant/10 p-4 z-30">
          <Button
            className="w-full h-14 rounded-2xl shadow-primary-glow"
            onClick={() =>
              navigate("/add-product", {
                state: {
                  ...location.state,
                  generatedDescription: fullDescription,
                },
              })
            }
          >
            <CheckCircle size={18} className="mr-2" />
            Use This Description
          </Button>
        </div>
      )}
    </div>
  );
}

function Section({ title, content }: any) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-outline-variant/10 shadow-soft space-y-2">
      <p className="text-xs text-outline font-bold uppercase tracking-widest">
        {title}
      </p>
      <div className="text-sm text-on-surface whitespace-pre-wrap leading-relaxed">
        {content}
      </div>
    </div>
  );
}
