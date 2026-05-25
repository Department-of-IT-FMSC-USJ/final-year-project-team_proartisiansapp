import React from "react";
import { useNavigate } from "react-router-dom";

interface EditProfileViewProps {}

export const EditProfileView: React.FC<EditProfileViewProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Photo Edit */}
      <section className="flex flex-col items-center p-8 gap-4">
        <div className="relative">
          <div className="size-32 rounded-full border-4 border-primary/20 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200"
              alt="Alex"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-4 border-white shadow-lg material-symbols-outlined text-white text-[16px]">
            photo_camera
          </div>
        </div>
        <p className="text-xl font-bold tracking-tight text-slate-900">
          Change Photo
        </p>
      </section>

      {/* Form */}
      <section className="flex flex-col gap-6 px-4">
        <FormField label="Full Name" icon="person" value="Alex Johnson" />
        <FormField
          label="Phone Number"
          icon="call"
          value="+1 (555) 123-4567"
          type="tel"
        />
        <div className="flex flex-col gap-2">
          <p className="text-slate-700 text-sm font-semibold px-1">Location</p>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-slate-400">
              location_on
            </span>
            <input
              readOnly
              value="San Francisco, CA"
              className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pointer-events-none"
            />
            <span className="material-symbols-outlined absolute right-4 text-primary cursor-pointer">
              my_location
            </span>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="mt-auto p-6 flex flex-col gap-4">
        <button
          onClick={() => navigate("/buyer/profile")}
          className="w-full h-14 bg-primary text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">save</span>
          <span>Save Changes</span>
        </button>
        <p className="text-center text-slate-400 text-xs">
          Last updated: 2 days ago
        </p>
      </div>
    </div>
  );
};

const FormField: React.FC<{
  label: string;
  icon: string;
  value: string;
  type?: string;
}> = ({ label, icon, value, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <p className="text-slate-700 text-sm font-semibold px-1">{label}</p>
    <div className="relative flex items-center">
      <span className="material-symbols-outlined absolute left-4 text-slate-400">
        {icon}
      </span>
      <input
        type={type}
        defaultValue={value}
        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </div>
  </div>
);
export default EditProfileView;
