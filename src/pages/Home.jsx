import { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../redux/features/product/productThunk";
import { Link } from "react-router-dom";
import { Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from "rxjs/operators";
import { searchProductsThunk } from "../redux/features/product/productThunk";
import { updateKeyword } from "../redux/features/product/productSlice";

function Home() {
  const ref = useRef();
  const searchSubject = useRef(new Subject());
  const dispatch = useDispatch();
  const { total, products, keyword, isResult } = useSelector(
    (state) => state.product
  );
  const limit = 10;
  const totalPages = Math.ceil(total / limit);
  const [page, setPage] = useState(1);
  const [curPageSearch, setCurPageSearch] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(999);
  const [starFrom, setStarFrom] = useState(0);
  const [starTo, setStarTo] = useState(5);
  const [name, setName] = useState(keyword);
  const arrFromOption = [0, 10, 20, 50, 70, 100];
  const arrToOption = [0, 10, 20, 50, 70, 100, 999];
  const [resultData, setResultData] = useState(products.slice(0, 10));
  const dataDisplay = isResult ? resultData : products;

  const filteredToOption =
    typeof from === "number"
      ? arrToOption.filter((item) =>
          typeof item === "number" ? item > from : true
        )
      : arrToOption;

  // Lấy data
  const handleGetProducts = async () => {
    dispatch(getProductsThunk({ page, limit }));
  };

  // Lấy data khi chuyển trang
  useEffect(() => {
    handleGetProducts();
  }, [page]);

  // Khi thay đổi trang -> setResultData
  useEffect(() => {
    if (isResult) {
      setResultData(
        products.slice((curPageSearch - 1) * limit, curPageSearch * limit)
      );
    }
  }, [curPageSearch, products]);

  useEffect(() => {
    setCurPageSearch(1);
  }, [products]);

  // Đóng mở modal
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

  // Tìm kiếm
  useEffect(() => {
    const subscription = searchSubject.current
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((value) => {
          dispatch(updateKeyword(value));
        }),
        switchMap((value) => {
          if (value.trim() !== "") {
            return dispatch(searchProductsThunk(value));
          }
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (name !== "") {
      searchSubject.current.next(name);
    }
  }, [name]);

  return (
    <>
      {/* Tìm kiếm, lọc */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 pt-5 border-b border-slate-300 h-28">
        <div className="flex sm:flex-col flex-row gap-5 sm:gap-0 items-end">
          <span className="text-4xl font-bold mr-auto">Shop</span>
          <span className="text-2xl mr-auto sm:mb-auto flex-1">Shop</span>
        </div>
        <div className="flex items-center gap-2 mt-auto ml-auto">
          <div className="px-3 py-2 w-[270px] border relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search... "
              className="w-[92%] outline-none"
            />
            <img
              src="/icons/search.png"
              alt="icon"
              className="w-6 h-6 absolute top-2 right-2"
            />
          </div>
          <div className="relative">
            <img
              src="/icons/filter.png"
              alt="icon"
              className="w-8 h-8 "
              onClick={() => setIsOpen((prev) => !prev)}
            />
            {isOpen && (
              <div
                ref={ref}
                className="absolute w-[270px] top-9 right-0 bg-white"
              >
                <div className="w-full py-2 text-center text-xl font-semibold border bg-white">
                  Filter
                </div>
                <div className="flex flex-col p-5 bg-[#C6E5F4]">
                  <span className="text-center w-full">Giá</span>
                  <div className="flex gap-3 items-center justify-between">
                    <span>Từ</span>
                    <div className="flex gap-2">
                      <select
                        value={from}
                        onChange={(e) => setFrom(Number(e.target.value))}
                        className="w-20 outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {arrFromOption?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <span>$</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center justify-between">
                    <span>Đến</span>
                    <div className="flex gap-2">
                      <select
                        value={to}
                        onChange={(e) => setTo(Number(e.target.value))}
                        className="w-20 outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {filteredToOption?.map((item, index) => (
                          <option key={index} value={item}>
                            {item === 999 ? "Vô cùng" : item}
                          </option>
                        ))}
                      </select>
                      <span>$</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-5 bg-[#C6E5F4]">
                  <span className="text-center w-full">Đánh giá</span>
                  <div className="flex gap-3 items-center justify-between">
                    <span>Từ</span>
                    <div className="flex gap-2">
                      <select
                        value={starFrom}
                        onChange={(e) => setStarFrom(Number(e.target.value))}
                        className="w-20 outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[...Array(6)]?.map((_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                      <span>Sao</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center justify-between">
                    <span>Đến</span>
                    <div className="flex gap-2">
                      <select
                        value={starTo}
                        onChange={(e) => setStarTo(Number(e.target.value))}
                        className="w-20 outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[...Array(6)]?.map((_, index) => {
                          return index > starFrom ? (
                            <option key={index} value={index}>
                              {index}
                            </option>
                          ) : null;
                        })}
                      </select>
                      <span>Sao</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Hiển thị sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
        {dataDisplay.length === 0 && <div>Không tìm thấy sản phẩm nào!</div>}
        {dataDisplay?.map((item, index) => {
          return (
            <Link
              to={`/product/${item.id}`}
              key={index}
              className="flex gap-3 rounded-md p-3 hover:border hover:border-slate-200"
            >
              <img
                src={item?.thumbnail}
                alt="product"
                className="w-[125px] h-[175px] object-cover"
              />
              <div className="flex flex-col gap-5 font-bold">
                <span>{item?.title}</span>
                <span>{item?.price} $</span>
                <span className="flex gap-1">
                  {[...Array(Math.ceil(item?.rating || 0))].map((_, i) => (
                    <img key={i} src="/icons/star.svg" className="w-5 h-5" />
                  ))}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Phân trang */}
      <div className="px-5 pb-10">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={({ selected }) => {
            if (isResult) {
              setCurPageSearch(selected + 1);
            } else {
              setPage(selected + 1);
            }
          }}
          containerClassName="flex gap-2 justify-center flex-wrap mt-6"
          pageClassName="rounded bg-gray-100 px-3 py-1 cursor-pointer"
          activeClassName="bg-[#C6E5F4] text-blue-600 font-bold"
          previousClassName="rounded bg-gray-100 px-3 py-1 cursor-pointer"
          nextClassName="rounded bg-gray-100 px-3 py-1 cursor-pointer"
          breakClassName="rounded bg-gray-100 px-3 py-1"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </>
  );
}

export default Home;
