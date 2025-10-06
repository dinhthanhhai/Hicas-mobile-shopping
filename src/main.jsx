import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./layouts/Header.jsx";
import Sidebar from "./layouts/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ProductDetail from "./pages/ProductDetail.jsx";
import { useDispatch } from "react-redux";
import { resetKeyword } from "./redux/features/product/productSlice.js";
import { useEffect } from "react";
import { checkAuth } from "./redux/features/user/userSlice.js";
import LoadingOverlay from "./components/LoadingOverlay.jsx";

function AppLayout() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetKeyword());
  }, [location.pathname, dispatch]);

  const isLoginUrl = location.pathname === "/login";

  if (isLoginUrl) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <>
      <Header />
      <main className="mt-20 flex h-screen">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shopping-cart" element={<Cart />} />
            <Route path="/my-profile" element={<Profile />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppLayout />
          <LoadingOverlay />
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
