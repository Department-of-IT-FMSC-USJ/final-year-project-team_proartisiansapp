import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  User,
  LogOut,
  ChevronRight,
  Settings,
  ShieldCheck,
  Heart,
  ShoppingBag,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/src/components/Button";
import { auth, db } from "@/src/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function BuyerProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setName(docSnap.data().name || user.displayName || "Buyer");
          setEmail(docSnap.data().email || user.email || "");
        }
        setPhotoURL(user.photoURL || "");
      } catch (error) {
        console.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-24">
      <header>
        <button
          onClick={() => navigate(-1)}
          className="text-on-surface flex size-12 shrink-0 items-center justify-start cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>
      <section className="flex flex-col items-center py-6">
        <div className="size-20 rounded-3xl overflow-hidden border-4 border-primary-container/20 mb-4 shadow-soft bg-surface-container flex items-center justify-center">
          {photoURL ? (
            <img
              src={photoURL}
              className="w-full h-full object-cover"
              alt={name}
            />
          ) : (
            <User size={40} className="text-on-surface-variant" />
          )}
        </div>
        <h2 className="text-xl font-black">{name}</h2>
        <p className="text-outline text-sm">{email}</p>
        <div className="mt-2 bg-primary-container/10 text-primary-container px-3 py-1 rounded-full">
          <span className="text-[10px] font-black uppercase tracking-widest">
            Buyer Account
          </span>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-outline-variant/10 shadow-soft">
          <span className="text-primary-container font-black text-2xl">24</span>
          <span className="text-outline text-[10px] uppercase font-black tracking-widest">
            Orders
          </span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-outline-variant/10 shadow-soft">
          <span className="text-primary-container font-black text-2xl">12</span>
          <span className="text-outline text-[10px] uppercase font-black tracking-widest">
            Saved
          </span>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-soft">
        <ProfileItem
          icon={ShoppingBag}
          label="My Orders"
          onClick={() => navigate("/buyer/orders")}
        />
        <ProfileItem
          icon={Heart}
          label="Saved Items"
          onClick={() => navigate("/buyer/saved")}
        />
        <ProfileItem
          icon={MessageCircle}
          label="Shopping Assistant"
          onClick={() => navigate("/buyer/assistant")}
        />
        <ProfileItem icon={ShieldCheck} label="Account Security" />
        <ProfileItem
          icon={Settings}
          label="Settings"
          onClick={() => navigate("/buyer/settings")}
        />
      </div>

      <div className="pt-4">
        <Button
          variant="outline"
          className="w-full h-16 rounded-2xl bg-surface-container-low border-none font-bold text-on-surface"
          onClick={async () => {
            await auth.signOut();
            navigate("/");
          }}
        >
          <LogOut className="mr-3 text-error" size={20} /> Logout
        </Button>
      </div>
    </div>
  );
}

const ProfileItem = ({ icon: Icon, label, onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 p-5 hover:bg-surface-container transition-colors border-b border-outline-variant/5 last:border-0 group"
  >
    <div className="size-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
      <Icon size={20} />
    </div>
    <span className="font-bold text-sm flex-1 text-left">{label}</span>
    <ChevronRight size={18} className="text-outline opacity-30" />
  </button>
);
