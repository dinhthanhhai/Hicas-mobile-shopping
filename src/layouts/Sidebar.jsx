import { NavLink, useLocation } from "react-router-dom";
import { Menu, Store, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { isLogined } = useSelector((state) => state.user);
  const isUrlShop =
    location.pathname === "/" || location.pathname.startsWith("/product/");
  return (
    <div
      className={`w-[60px] md:w-[243px] h-full flex flex-col text-xl border border-[#000000]`}
    >
      <div className="flex justify-between p-4">
        <span className="hidden md:block">Menu</span>
        <Menu className="w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <NavLink
          to="/"
          className={({}) =>
            [
              "flex gap-5 items-center px-4 py-2",
              isUrlShop
                ? "border-b border-t border-[#0FEAF8] text-[#0FEAF8]"
                : "border-t border-slate-300",
            ].join(" ")
          }
        >
          <Store className="w-7 h-7" />
          <span className="hidden md:block">Shop</span>
        </NavLink>
        {isLogined && (
          <>
            <NavLink
              to="/shopping-cart"
              className={({ isActive }) =>
                [
                  "flex gap-5 items-center px-4 py-2",
                  isActive
                    ? "border-b border-t border-[#0FEAF8] text-[#0FEAF8]"
                    : "",
                ].join(" ")
              }
            >
              <ShoppingCart />
              <span className="hidden md:block">Cart</span>
            </NavLink>
            <NavLink
              to="/my-profile"
              className={({ isActive }) =>
                [
                  "flex gap-5 items-center px-4 py-2",
                  isActive
                    ? "border-b border-t border-[#0FEAF8] text-[#0FEAF8]"
                    : "",
                ].join(" ")
              }
            >
              <User className="w-6 h-6" />
              <span className="hidden md:block">My Profile</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
