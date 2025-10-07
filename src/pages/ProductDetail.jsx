import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsThunk } from "../redux/features/product/productThunk";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { addProduct, setViewProduct } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { isLogined } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [imgUrl, setImgUrl] = useState(null);
  const handleGetProduct = (id) => {
    if (!id) {
      toast.error("Thiếu dữ liệu!");
      return;
    }
    dispatch(getProductDetailsThunk(id));
  };

  const handleAddProduct = (product) => {
    if (isLogined) {
      dispatch(addProduct(product));
      toast.success("Thêm sản phẩm thành công!");
    } else {
      toast.warning("Vui lòng đăng nhập!");
    }
  };

  useEffect(() => {
    handleGetProduct(id);
  }, [id]);

  useEffect(() => {
    setImgUrl(product?.images[0]);
  }, [product]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-3 px-5 pt-5 border-b border-slate-300 h-28">
        <span className="text-4xl font-bold mr-auto">Shop</span>
        <div className="flex items-center justify-between">
          <p className="text-2xl mr-auto sm:mb-auto flex-1 flex gap-1">
            <Link to={"/"}>Shop</Link>
            <span>/</span>
            <span>Product</span>
          </p>
          <Link to={"/shopping-cart"} className="relative">
            <ShoppingCart className="w-8 h-8" />
            <span className="w-4 h-4 flex items-center justify-center rounded-full border bg-[#C6E5F4] absolute top-0 -right-1 text-[10px]">
              {cart.total}
            </span>
          </Link>
        </div>
      </div>
      {/* Chi tiết sản phẩm */}
      <div className="flex flex-col lg:flex-row w-full p-5">
        <div className="w-full sm:w-[300px] mx-auto flex-shrink-0">
          <div className="flex flex-col justify-center gap-2">
            <img
              src={imgUrl}
              alt="product"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full flex gap-1 items-center justify-center">
            {product?.images?.map((item, index) => (
              <div
                key={index}
                className={`rounded-md ${
                  imgUrl === item ? "border-2 border-blue-400" : ""
                }`}
              >
                <img
                  src={item}
                  alt="product"
                  onClick={() => setImgUrl(item)}
                  className="w-10 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-5 pr-0 lg:pr-10 flex flex-col h-full my-auto">
          <span className="text-lg font-semibold">{product?.title}</span>
          <p className="mt-5">{product?.description}</p>
          <span className="mt-5 text-3xl font-bold">{product?.price} $</span>
          <span className="flex gap-1 mt-3">
            {product?.rating > 0 &&
              [...Array(Math.ceil(product?.rating))].map((_, i) => (
                <img key={i} src="/icons/star.svg" className="w-8 h-8 " />
              ))}
          </span>
          <div className="grid grid-cols-2 gap-5 text-white text-2xl font-semibold mt-5">
            <button
              className="py-3 rounded-lg bg-[#00C2FF]"
              onClick={() => handleAddProduct(product)}
            >
              Mua ngay
            </button>
            <button
              className="py-3 rounded-lg bg-[#00FF19]"
              onClick={() => handleAddProduct(product)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
