import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

// individual product card component
// navigates to prodcut detail page on click
const ProductCard = ({ product }) => {
  const navigate = useNavigate();


  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/product/${product.id}`)}
    >
      <img
        className="product-card-img"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="product-card-title" title={product.title}>
        {product.title}
      </div>
      <div className="product-card-bottom">
        <span className="product-card-price">${product.price}</span>
        <StarRating rating={product.rating} />
        <span className="rating-count">({product.rating?.toFixed(1)})</span>
      </div>
    </div>
  );
};

export default ProductCard;
