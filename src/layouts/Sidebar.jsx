import { NavLink, useLocation } from "react-router-dom";
import { Menu, Store, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const { isLogined } = useSelector((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isUrlShop =
    location.pathname === "/" || location.pathname.startsWith("/product/");
  return (
    <div
      className={`${
        isOpen ? "w-[240px]" : "w-[60px]"
      } h-full md:max-w-[200px] lg:max-w-none flex flex-col text-xl border border-[#000000]`}
    >
      <div className="flex justify-between p-4">
        {isOpen && <span>Menu</span>}
        <Menu
          className="w-6 h-6"
          onClick={() => {
            if (window.innerWidth >= 768) {
              setIsOpen((prev) => !prev);
            }
          }}
        />
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
          {isOpen && <span>Shop</span>}
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
              {isOpen && <span>Cart</span>}
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
              {isOpen && <span>My Profile</span>}
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
