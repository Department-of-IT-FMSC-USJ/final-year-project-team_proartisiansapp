import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/src/context/UserContext";
import { AppLayout } from "@/src/components/AppLayout";

import Splash from "./pages/seller/Splash";
import RoleSelection from "./pages/seller/RoleSelection";
import Auth from "./pages/seller/Auth";
import ShopSetup from "./pages/seller/ShopSetup";
import Welcome from "./pages/seller/Welcome";
import Dashboard from "./pages/seller/Dashboard";
import Inventory from "./pages/seller/Inventory";
import AddProduct from "./pages/seller/AddProduct";
import DescriptionAssistant from "./pages/seller/DescriptionAssistant";
import Profile from "./pages/seller/Profile";
import Orders from "./pages/seller/Orders";
import Login from "./pages/seller/Login";

import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BuyerAuth from "./pages/buyer/BuyerAuth";
import BuyerAssistant from "./pages/buyer/BuyerAssistant";
import BuyerLogin from "./pages/buyer/BuyerLogin";
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerOrderDetails from "./pages/buyer/BuyerOrderDetails";
import BuyerProfile from "./pages/buyer/BuyerProfile";
import BuyerSaved from "./pages/buyer/BuyerSaved";
import EditProfileView from "./pages/buyer/EditProfileView";
import NotificationsView from "./pages/buyer/NotificationsView";
import SettingsView from "./pages/buyer/SettingsView";
import SupportView from "./pages/buyer/SupportView";

function AppRoutes() {
  const { isAuthenticated } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/select-role" element={<RoleSelection />} />
      <Route path="seller/auth" element={<Auth />} />
      <Route path="seller/login" element={<Login />} />

      <Route path="seller/shop-setup" element={<ShopSetup />} />
      <Route path="/welcome" element={<Welcome />} />

      <Route element={<AppLayout />}>
        <Route path="seller/dashboard" element={<Dashboard />} />
        <Route path="seller/inventory" element={<Inventory />} />
        <Route path="seller/add-product" element={<AddProduct />} />
        <Route
          path="seller/description-assistant"
          element={<DescriptionAssistant />}
        />
        <Route path="seller/profile" element={<Profile />} />
        <Route path="seller/orders" element={<Orders />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/buyer/login" element={<BuyerLogin />} />
      <Route path="/buyer/auth" element={<BuyerAuth />} />
      <Route path="/buyer/assistant" element={<BuyerAssistant />} />
      <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
      <Route path="/buyer/orders" element={<BuyerOrders />} />
      <Route path="/buyer/orders/:id" element={<BuyerOrderDetails />} />
      <Route path="/buyer/profile" element={<BuyerProfile />} />
      <Route path="/buyer/saved" element={<BuyerSaved />} />
      <Route path="/buyer/profile/edit" element={<EditProfileView />} />
      <Route path="/buyer/notifications" element={<NotificationsView />} />
      <Route path="/buyer/settings" element={<SettingsView />} />
      <Route path="/buyer/support" element={<SupportView />} />
    </Routes>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}
