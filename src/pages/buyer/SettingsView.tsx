import React from "react";
import { useNavigate } from "react-router-dom";

interface SettingsViewProps {
  onNavigate: (view: Screen) => void;
  onBack: () => void;
}

interface SettingsViewProps {
  onNavigate: (view: Screen) => void;
  onBack: () => void;
}

const SettingsView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Account Preferences */}
      <section className="px-4 pt-6 pb-2">
        <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest px-2">
          Account Preferences
        </h3>
      </section>

      <div className="flex flex-col">
        <SettingsItem
          icon="translate"
          title="Change Language"
          subtitle="Sinhala, Tamil, English"
          trailing={
            <span className="text-primary text-sm font-bold">English</span>
          }
        />
        <SettingsItem
          icon="notifications"
          title="Notification Settings"
          subtitle="Manage alerts and sounds"
        />
      </div>

      {/* Support & Legal */}
      <section className="px-4 pt-8 pb-2">
        <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest px-2">
          Support & Legal
        </h3>
      </section>

      <div className="flex flex-col">
        <SettingsItem
          icon="help"
          title="Help & Support"
          subtitle="FAQs and contact artisan help"
          onClick={() => navigate("/buyer/support")}
        />
        <SettingsItem
          icon="policy"
          title="Privacy Policy"
          subtitle="Terms of service and data usage"
        />
      </div>

      {/* Logout */}
      <div className="mt-8 px-6 mb-10">
        <button
          onClick={() => navigate("/login")}
          className="w-full h-14 flex items-center justify-center gap-2 bg-slate-100 text-rose-600 font-bold rounded-2xl border border-slate-200 active:bg-rose-50 transition-all"
        >
          {" "}
          <span className="material-symbols-outlined">logout</span>
        </button>
        <p className="text-center text-slate-400 text-[10px] font-bold tracking-widest mt-6 uppercase">
          Pro-Artisan v2.4.1
        </p>
      </div>
    </div>
  );
};

const SettingsItem: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  trailing?: React.ReactNode;
  onClick?: () => void;
}> = ({ icon, title, subtitle, trailing, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 px-4 py-5 border-b border-slate-50 bg-white active:bg-slate-50 transition-colors group"
  >
    <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-all group-hover:scale-105">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div className="flex-1 text-left">
      <p className="text-slate-900 font-bold leading-tight">{title}</p>
      <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>
    </div>
    <div className="flex items-center gap-1">
      {trailing}
      <span className="material-symbols-outlined text-slate-300">
        chevron_right
      </span>
    </div>
  </button>
);

export default SettingsView;
