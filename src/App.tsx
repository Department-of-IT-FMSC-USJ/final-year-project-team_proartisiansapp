import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/src/context/UserContext";
import { AppLayout } from "@/src/components/AppLayout";

import Splash from "./pages/Splash";
import RoleSelection from "./pages/RoleSelection";
import Auth from "./pages/Auth";
import Verification from "./pages/Verification";
import ShopSetup from "./pages/ShopSetup";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import AddProduct from "./pages/AddProduct";
import DescriptionAssistant from "./pages/DescriptionAssistant";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

function AppRoutes() {
  const { isAuthenticated } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/select-role" element={<RoleSelection />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/shop-setup" element={<ShopSetup />} />
      <Route path="/welcome" element={<Welcome />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route
          path="/description-assistant"
          element={<DescriptionAssistant />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
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
