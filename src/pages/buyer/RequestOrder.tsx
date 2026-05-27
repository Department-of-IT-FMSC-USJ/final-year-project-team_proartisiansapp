import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, CreditCard, Truck, ShoppingBag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db, auth } from "@/src/firebase/firebaseConfig";

export default function RequestOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");

  const handleSubmitOrder = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        buyerId: auth.currentUser?.uid,
        buyerName: fullName,

        sellerId: product.sellerId,
        sellerName: product.sellerName,

        productId: product.id,
        productName: product.productName,
        productImage: product.imageUrl,

        email,
        phone,
        postalCode,

        quantity: Number(quantity),
        address,
        notes,

        paymentMethod,

        status: "pending",

        createdAt: serverTimestamp(),
      });

      navigate("/buyer/orders");
    } catch (error) {
      console.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-surface max-w-md mx-auto pb-24">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="size-11 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center shadow-soft"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-black text-on-surface">Request Order</h1>

          <p className="text-sm text-outline">
            Send your request to the artisan
          </p>
        </div>
      </header>

      {/* Product */}
      <section className="px-4">
        <div className="bg-white rounded-3xl p-4 border border-outline-variant/10 shadow-soft flex gap-4">
          <img
            src={product?.imageUrl}
            alt="Product"
            className="w-24 h-24 rounded-2xl object-cover"
          />

          <div className="flex-1">
            <h2 className="font-black text-on-surface leading-tight">
              {product?.productName}{" "}
            </h2>

            <p className="text-sm text-outline mt-1">{product?.sellerName}</p>

            <p className="text-primary-container font-black text-lg mt-3">
              Rs. {product?.price}
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 pt-6 space-y-5">
        {/* Customer Info */}
        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm font-black text-on-surface mb-2 block">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-14 px-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-black text-on-surface mb-2 block">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 px-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-black text-on-surface mb-2 block">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-14 px-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="text-sm font-black text-on-surface mb-2 block">
              Postal Code
            </label>

            <input
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full h-14 px-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>
        </div>
        {/* Quantity */}
        <div>
          <label className="text-sm font-black text-on-surface mb-2 block">
            Quantity
          </label>

          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-black text-on-surface mb-2 block">
            Delivery Address
          </label>

          <textarea
            rows={4}
            placeholder="Enter your delivery address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-container resize-none"
          />
        </div>

        {/* Note */}
        <div>
          <label className="text-sm font-black text-on-surface mb-2 block">
            Additional Notes
          </label>

          <textarea
            rows={4}
            placeholder="Add custom requirements..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white border border-outline-variant/20 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-container resize-none"
          />
        </div>
      </section>

      {/* Payment */}
      <section className="px-4 pt-6">
        <h2 className="text-lg font-black mb-4">Payment Method</h2>

        <div className="space-y-3">
          {/* COD */}
          <button
            onClick={() => setPaymentMethod("cod")}
            className={`w-full p-4 rounded-3xl border flex items-center gap-4 transition-all ${
              paymentMethod === "cod"
                ? "border-primary-container bg-primary-container/10"
                : "border-outline-variant/20 bg-white"
            }`}
          >
            <div className="size-12 rounded-2xl bg-surface-container-low flex items-center justify-center">
              <Truck size={22} />
            </div>

            <div className="flex-1 text-left">
              <h3 className="font-black">Cash on Delivery</h3>

              <p className="text-sm text-outline">
                Pay when your order arrives
              </p>
            </div>

            <div
              className={`size-5 rounded-full border-2 ${
                paymentMethod === "cod"
                  ? "border-primary-container bg-primary-container"
                  : "border-outline"
              }`}
            />
          </button>

          {/* Card */}
          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-full p-4 rounded-3xl border flex items-center gap-4 transition-all ${
              paymentMethod === "card"
                ? "border-primary-container bg-primary-container/10"
                : "border-outline-variant/20 bg-white"
            }`}
          >
            <div className="size-12 rounded-2xl bg-surface-container-low flex items-center justify-center">
              <CreditCard size={22} />
            </div>

            <div className="flex-1 text-left">
              <h3 className="font-black">Card Payment</h3>

              <p className="text-sm text-outline">Visa, MasterCard supported</p>
            </div>

            <div
              className={`size-5 rounded-full border-2 ${
                paymentMethod === "card"
                  ? "border-primary-container bg-primary-container"
                  : "border-outline"
              }`}
            />
          </button>
        </div>
      </section>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-outline-variant/10 p-4 flex gap-3">
        {/* Cancel */}
        <button
          onClick={() => navigate(-1)}
          className="flex-1 h-14 rounded-2xl border border-outline-variant/20 font-black"
        >
          Cancel
        </button>

        {/* Submit */}
        <button
          onClick={handleSubmitOrder}
          className="flex-1 h-14 rounded-2xl bg-primary-container text-on-primary-container font-black flex items-center justify-center gap-2 shadow-soft"
        >
          <ShoppingBag size={20} />
          Send Request
        </button>
      </div>
    </div>
  );
}
