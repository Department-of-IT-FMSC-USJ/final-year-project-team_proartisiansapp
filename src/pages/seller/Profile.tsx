import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  User,
  LogOut,
  ChevronRight,
  Settings,
  ShieldCheck,
  CreditCard,
  Share2,
} from "lucide-react";
import { Button } from "@/src/components/Button";
import { auth } from "@/src/firebase/firebaseConfig";
import { getShopProfile } from "@/src/services/shopService";

export default function Profile() {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("Loading...");
  const [location, setLocation] = useState("Loading...");
  const [logoUrl, setLogoUrl] = useState("https://via.placeholder.com/150");

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const profile = await getShopProfile(user.uid);

        if (profile) {
          setShopName(profile.shopName || "No Shop Name");
          setLocation(profile.location || "No Location");
          setLogoUrl(profile.logoUrl || "https://via.placeholder.com/150");
        }
      } catch (error) {
        console.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <header className="flex flex-col items-center py-6">
        <div className="size-24 rounded-3xl overflow-hidden border-4 border-primary-container/20 mb-4 shadow-soft">
          <img src={logoUrl} />
        </div>
        <h2 className="text-xl font-black">{shopName}</h2>
        <p className="text-outline text-sm">{location}</p>
      </header>

      <div className="bg-white rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-soft">
        <ProfileItem icon={User} label="Personal Information" />
        <ProfileItem icon={CreditCard} label="Payment Methods" />
        <ProfileItem icon={ShieldCheck} label="Account Security" />
        <ProfileItem icon={Settings} label="Global Settings" />
        <ProfileItem icon={Share2} label="Refer Artisans" />
      </div>

      <div className="pt-4">
        <Button
          variant="outline"
          className="w-full h-16 rounded-2xl bg-surface-container-low border-none font-bold text-on-surface"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 text-error" size={20} /> Logout
        </Button>
      </div>
    </div>
  );
}

const ProfileItem = ({ icon: Icon, label }: any) => (
  <button className="w-full flex items-center gap-4 p-5 hover:bg-surface-container transition-colors border-b border-outline-variant/5 last:border-0 group">
    <div className="size-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
      <Icon size={20} />
    </div>
    <span className="font-bold text-sm flex-1 text-left">{label}</span>
    <ChevronRight size={18} className="text-outline opacity-30" />
  </button>
);
