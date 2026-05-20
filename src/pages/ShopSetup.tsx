import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { saveShopProfile } from "@/src/services/shopService";
import { auth } from "@/src/firebase/firebaseConfig";

export default function ShopSetup() {
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!shopName || !location || !description) {
      setErrorMessage("❌ Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        setErrorMessage("❌ User not found. Please login again.");
        return;
      }

      await saveShopProfile(user.uid, shopName, location, description);

      setSuccessMessage("✅ Shop profile saved successfully!");

      setTimeout(() => {
        navigate("/welcome");
      }, 1500);
    } catch (error) {
      setErrorMessage("❌ Failed to save shop profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/welcome");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      {/* Success Alert */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg">
          {successMessage}
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg">
          {errorMessage}
        </div>
      )}

      <header className="flex items-center p-4 bg-white border-b border-primary-container/10 sticky top-0 z-20">
        <button
          onClick={() => navigate(-1)}
          className="text-on-surface flex size-10 items-center justify-center rounded-full hover:bg-primary-container/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h2 className="text-on-surface text-lg font-bold ml-4">
          Shop Profile Setup
        </h2>
      </header>

      <main className="flex-1 p-6 space-y-8">
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-primary-container/5 space-y-10">
          {/* Logo Upload (UI only for now) */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                id="photoUpload"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <div className="size-32 rounded-full overflow-hidden border-4 border-primary-container/20 p-1 bg-surface-container-low">
                <img
                  src={
                    photoPreview ||
                    "https://images.unsplash.com/photo-1541746972996-4e0b0f43e03a?auto=format&fit=crop&q=80&w=400"
                  }
                  className="w-full h-full object-cover rounded-full"
                  alt="Shop Preview"
                />
              </div>

              <label
                htmlFor="photoUpload"
                className="absolute bottom-0 right-0 size-10 bg-primary-container text-on-primary-container rounded-full shadow-lg border-2 border-white flex items-center justify-center cursor-pointer"
              >
                <Camera size={18} />
              </label>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-on-surface">
                Shop Logo or Photo
              </h3>
              <p className="text-sm text-outline">
                Tell customers about your handmade products.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <Input
              label="Shop Name"
              placeholder="e.g. Example Art Creations"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              required
            />

            <Input
              label="Location"
              placeholder="City, Country"
              leftIcon={<MapPin size={18} className="text-primary-container" />}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <div className="space-y-2">
              <p className="text-on-surface text-sm font-semibold">
                Short Shop Description
              </p>

              <textarea
                className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container/50 focus:border-primary-container outline-none transition-all min-h-[120px] resize-none text-sm leading-relaxed"
                placeholder="Share the story behind your handmade creations..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <p className="text-[10px] text-outline italic">
                Tip: Mention what makes your crafts unique.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 space-y-4">
            <Button
              className="w-full h-16 rounded-2xl text-lg shadow-primary-glow"
              onClick={handleSave}
              disabled={loading}
            >
              <CheckCircle className="mr-2 w-6 h-6" />
              {loading ? "Saving..." : "Save Shop Profile"}
            </Button>

            <button
              onClick={handleSkip}
              className="w-full text-outline font-bold text-sm uppercase tracking-widest hover:text-on-surface transition-colors py-2"
            >
              Skip for now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
