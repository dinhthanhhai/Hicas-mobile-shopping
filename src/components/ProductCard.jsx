import { Link } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <Link
      to={`/product/${item.id}`}
      className="flex gap-3 rounded-md p-3 hover:border hover:border-slate-200"
    >
      <img
        src={item?.thumbnail}
        alt="product"
        className="w-[125px] h-[175px] object-contain"
      />
      <div className="flex flex-col gap-5 font-bold">
        <span>{item?.title}</span>
        <span>{item?.price} $</span>
        <span className="flex gap-1 flex-wrap">
          {[...Array(Math.ceil(item?.rating || 0))].map((_, i) => (
            <img key={i} src="/icons/star.svg" className="w-5 h-5" />
          ))}
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;
