import React from "react";
import { useNavigate } from "react-router-dom";

interface SupportViewProps {
  onBack: () => void;
}

const SupportView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Search */}
      <section className="p-4 bg-white sticky top-0 z-10">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl shadow-inner text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            placeholder="Search for topics or questions..."
          />
        </div>
      </section>

      {/* Categories */}
      <section className="grid grid-cols-2 gap-4 p-4">
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl group active:border-primary transition-all shadow-sm">
          <span className="material-symbols-outlined text-primary text-4xl mb-3 transition-transform group-hover:scale-110">
            shopping_bag
          </span>
          <span className="text-sm font-bold">Orders</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl group active:border-primary transition-all shadow-sm">
          <span className="material-symbols-outlined text-primary text-4xl mb-3 transition-transform group-hover:scale-110">
            payments
          </span>
          <span className="text-sm font-bold">Payments</span>
        </button>
      </section>

      {/* FAQs */}
      <section className="p-4 space-y-4">
        <h2 className="text-lg font-bold px-1 mb-4">Common Questions</h2>

        <FAQItem
          question="How do I request an order?"
          answer="To request an order, simply browse the artisan's portfolio from the home screen. Once you find a service or product you like, click the 'Request Quote' or 'Book Now' button. You can then specify your requirements and start a conversation with the artisan directly."
        />
        <FAQItem
          question="How can I contact a seller?"
          answer="You can contact a seller by visiting their profile and tapping the 'Message' icon. If you have an active order, you can also find the chat option within your 'Orders' tab to discuss specifics."
        />
        <FAQItem
          question="What is the refund policy?"
          answer="Refunds are typically processed if an artisan fails to deliver the work as described or if an order is cancelled within the 24-hour grace period. Please review our full terms of service for specific category policies."
        />
      </section>

      {/* Still Need Help */}
      <section className="m-4 p-6 bg-primary/5 border border-primary/10 rounded-3xl text-center mb-24">
        <h3 className="font-bold text-lg mb-2">Still need help?</h3>
        <p className="text-sm text-slate-500 mb-6 px-4">
          Our support team is available 24/7 to assist you with any inquiries.
        </p>
        <button
          onClick={() => navigate("/buyer/profile")}
          className="w-full h-14 bg-primary text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
        >
          {" "}
          <span className="material-symbols-outlined">support_agent</span>
          <span>Contact Support</span>
        </button>
      </section>
    </div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left active:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-bold text-slate-900 pr-4">
          {question}
        </span>
        <span
          className={`material-symbols-outlined text-slate-300 transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`}
        >
          expand_more
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
          {answer}
        </div>
      )}
    </div>
  );
};

export default SupportView;
