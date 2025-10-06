import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { logout } from "../redux/features/user/userSlice";
import { removeViewProduct } from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogined, info } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeViewProduct());
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOut(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOut);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, [isOpen, ref]);

  return (
    <header className="fixed insert-0 z-50 top-0 w-full h-20 bg-[#C6E5F4] flex items-center">
      <Link to={"/"}>
        <img
          src="/images/logo.png"
          alt="logo"
          className="ml-[37px] w-16 h-14"
        />
      </Link>
      <span className="text-2xl ml-4 hidden sm:block">Moblie Shopping</span>
      {isLogined ? (
        <div className="ml-auto mr-5 realtive bg-white rounded-full">
          <img
            src={info.image || "/images/avatar.png"}
            alt="avatar"
            className="w-12 h-12"
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <div
              ref={ref}
              className="absolute -bottom-9 right-2 px-3 py-1 bg-white border"
            >
              <span className="cursor-pointer" onClick={() => handleLogout()}>
                Đăng xuất
              </span>
            </div>
          )}
        </div>
      ) : (
        <Link
          to={"/login"}
          className="border px-2 py-1 rounded-md ml-auto mr-5"
        >
          Đăng nhập
        </Link>
      )}
    </header>
  );
};

export default Header;
