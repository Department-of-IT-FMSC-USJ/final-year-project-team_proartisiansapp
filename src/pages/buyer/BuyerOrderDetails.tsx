import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BuyerOrderDetails() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <header className="flex items-center p-4 bg-white border-b border-outline-variant/10 sticky top-[72px] z-30">
        <button
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center rounded-full hover:bg-surface-container"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-sm font-black flex-1 text-center pr-10">
          Order Details
        </h2>
      </header>

      <section className="p-4">
        <div className="flex gap-4 items-start">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-outline-variant/10">
            <img
              src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=300"
              alt="Vase"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-primary-container uppercase tracking-wider mb-1">
              Order #ART-8821
            </p>
            <h2 className="text-xl font-black leading-tight mb-1">
              Custom Hand-Blown Glass Vase
            </h2>
            <p className="text-sm text-outline">
              by{" "}
              <span className="font-black text-on-surface">Artisan Julian</span>
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 bg-surface-container-low">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-outline mb-6">
          Production Status
        </h3>
        <div className="relative flex flex-col gap-8">
          <div className="flex gap-4 items-start">
            <div className="relative flex flex-col items-center">
              <div className="z-10 bg-primary-container rounded-full p-1.5 ring-4 ring-primary-container/20">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="absolute top-8 w-0.5 h-10 bg-primary-container"></div>
            </div>
            <div>
              <p className="font-black text-sm">Order Placed</p>
              <p className="text-xs text-outline">Oct 12, 2023 • 10:30 AM</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="relative flex flex-col items-center">
              <div className="z-10 bg-primary-container rounded-full p-1.5 ring-4 ring-primary-container/20">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="absolute top-8 w-0.5 h-12 bg-primary-container"></div>
            </div>
            <div>
              <p className="font-black text-sm">In Production</p>
              <p className="text-xs text-outline">Oct 14, 2023 • 2:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
