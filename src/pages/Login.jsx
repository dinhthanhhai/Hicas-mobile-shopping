import { useState, useEffect } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../redux/features/user/userThunk";
import { removeViewProduct } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogined, errMess } = useSelector((state) => state.user);
  const { viewProduct } = useSelector((state) => state.cart);
  const [isShowPass, setIsShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLogined) {
      navigate("/");
    }
  }, [isLogined, navigate]);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      await dispatch(loginUserThunk({ username, password })).unwrap();
      if (viewProduct) {
        navigate(viewProduct);
        dispatch(removeViewProduct());
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(errMess || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="h-screen bg-[#01AEEF] bg-[url('/images/frame.png')] bg-no-repeat bg-contain bg-bottom">
      <div className="w-[80%] sm:w-100 mx-auto pt-20 flex flex-col items-center">
        <Link
          to={"/"}
          className="w-22 h-22 bg-white rounded-full flex justify-center items-center"
        >
          <img src="/images/logo.png" className="w-15 h-15" />
        </Link>
        <div className="flex flex-col mt-10 sm:w-[400px] text-slate-600">
          <div className="bg-white rounded-md p-3 flex gap-2 items-center">
            <img src="/icons/user-icon.png" alt="icon" className="w-8 h-8" />
            <input
              type="text"
              placeholder="emilys"
              className="outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="bg-white mt-8 rounded-md p-3 flex gap-2 items-center">
            <img src="/icons/lock-icon.png" alt="icon" className="w-8 h-8" />
            <input
              type={isShowPass ? "text" : "password"}
              placeholder="emilyspass"
              className="outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPass ? (
              <Eye
                className="w-4 h-4 ml-auto cursor-pointer flex-shrink-0"
                onClick={() => setIsShowPass(false)}
              />
            ) : (
              <EyeOff
                className="w-4 h-4 ml-auto cursor-pointer"
                onClick={() => setIsShowPass(true)}
              />
            )}
          </div>
          <div className="mt-12 flex gap-3 justify-between text-white">
            <div className="flex gap-1 items-center">
              <input type="checkbox" className="w-5 h-5 border-none" />
              <span>Lưu đăng nhập</span>
            </div>
            <Link to={"#"}>Bạn quên mật khẩu?</Link>
          </div>
          <button
            className="w-[90%] mt-5 mx-auto px-3 py-2 border border-white text-white rounded-md"
            onClick={() => handleLogin()}
          >
            Đăng nhập
          </button>
          <p className="mt-15 text-white text-sm text-center">
            Nếu bạn có thắc mắc hay cần giải đáp, vui lòng liên hệ số điện
            thoại: <span className="font-semibold">19001000</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
