import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  minusProduct,
  deleteProduct,
} from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, total } = useSelector((state) => state.cart);
  const { isLogined } = useSelector((state) => state.user);
  const subTotal = products
    .reduce((acc, item) => acc + item.product.price * item.count, 0)
    .toFixed(2);
  const tax = (
    products.reduce((acc, item) => acc + item.product.price * item.count, 0) *
    0.1
  ).toFixed(2);
  const totalPrice = (
    products.reduce((acc, item) => acc + item.product.price * item.count, 0) *
    1.1
  ).toFixed(2);

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
    toast.success(`Thêm 1 ${product?.title}`);
  };

  const handleMinusProduct = (product) => {
    dispatch(minusProduct(product?.id));
    toast.success(`Xóa 1 ${product?.title}`);
  };

  const handleRemoveProduct = (product) => {
    dispatch(deleteProduct(product?.id));
    toast.success(`Xóa ${product?.title}`);
  };

  useEffect(() => {
    if (!isLogined) {
      toast.error("Vui lòng đăng nhập!");
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-3 px-5 pt-5 border-b border-slate-300 h-28">
        <span className="text-4xl font-bold mr-auto">Cart</span>
        <div className="flex items-center justify-between">
          <span className="text-xl xs:text-2xl mr-auto sm:mb-auto flex-1">
            Shop / Product
          </span>
          <span className="items-end">{total} Items in bag</span>
        </div>
      </div>
      {/* Chi tiết sản phẩm */}
      <div className="w-full p-5 flex flex-col">
        {products?.map((item, index) => {
          return (
            <div
              key={index}
              className="relative border-2 border-slate-300 flex sm:flex-row flex-col"
            >
              <img
                src={item?.product?.thumbnail}
                alt="product"
                className="w-52 h-auto object-center m-auto"
              />
              <div className="flex-1 p-5 gap-5 flex flex-col md:flex-row">
                <div className="flex-1 flex flex-col gap-5">
                  <span className="font-semibold">{item?.product?.title}</span>
                  <p>{item?.product?.description}</p>
                  <span className="font-bold text-2xl">
                    {item?.product?.price} $
                  </span>
                </div>
                <div className="w-fit flex gap-5 md:gap-3 items-center">
                  <span
                    onClick={() => handleAddProduct(item?.product)}
                    className="cursor-pointer hover:font-bold"
                  >
                    +
                  </span>
                  <span>{item?.count}</span>
                  <span
                    onClick={() => handleMinusProduct(item?.product)}
                    className="cursor-pointer hover:font-bold"
                  >
                    -
                  </span>
                </div>
              </div>
              <span
                className="w-4 h-4 flex items-center justify-center rounded-full border bg-[#C6E5F4] absolute -top-2 -right-2 text-[10px] cursor-pointer"
                onClick={() => handleRemoveProduct(item?.product)}
              >
                x
              </span>
            </div>
          );
        })}
      </div>
      {total > 0 && (
        <div className="w-fit ml-auto mr-5 pb-10">
          <div className="flex gap-5 justify-center">
            <span className="w-20 font-bold text-right">SubTotal</span>
            <span className="flex-1">{subTotal} $</span>
          </div>
          <div className="flex gap-5 justify-center">
            <span className="w-20 font-bold text-right">Tax</span>
            <span className="flex-1">{tax} $</span>
          </div>
          <div className="flex gap-5 justify-center">
            <span className="w-20 font-bold text-right">Total</span>
            <span className="flex-1">{totalPrice} $</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
