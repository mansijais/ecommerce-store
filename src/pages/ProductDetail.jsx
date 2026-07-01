import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productApi";
import StarRating from "../components/StarRating";
import Topnav from "../components/Topnav";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductById(id)
      .then((p) => {
        setProduct(p);
        setActiveImg(p.thumbnail);
      })
      .catch(() => setError("Could not load product."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Topnav />
      <div className="detail-page-layout">
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner" /> Loading…
          </div>
        )}
        {error && <div className="main-error-state"> {error}</div>}

        {product && !loading && (
          <>
            <button className="detail-back" onClick={() => navigate(-1)}>
              ← Back
            </button>

            <div className="detail-card">
            
              <div className="detail-img-col">
                <div className="detail-img-wrap">
                  <img src={activeImg || product.thumbnail} alt={product.title} />
                </div>
                {product.images?.length > 1 && (
                  <div className="detail-thumbnails">
                    {[product.thumbnail, ...product.images.filter(i => i !== product.thumbnail)]
                      .slice(0, 5)
                      .map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className={activeImg === img ? "active" : ""}
                        onClick={() => setActiveImg(img)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="detail-info">
                <h1 className="detail-title">{product.title}</h1>

                <div className="detail-price-row">
                  <span className="detail-price">${product.price}</span>
                  <StarRating rating={product.rating} />
                  <span className="rating-count">({product.rating?.toFixed(1)})</span>
                </div>

                <div className="detail-meta">
                  {product.brand && (
                    <div className="detail-meta-row">
                      <span className="detail-meta-label">Brand:</span>
                      <span className="detail-meta-value">{product.brand}</span>
                    </div>
                  )}
                  <div className="detail-meta-row">
                    <span className="detail-meta-label">Category:</span>
                    <span className="detail-meta-value" style={{ textTransform: "capitalize" }}>
                      {product.category}
                    </span>
                  </div>
                </div>

                <hr className="detail-divider" />

                <h2 className="detail-section-title">Description</h2>
                <p className="detail-desc">{product.description}</p>

                <hr className="detail-divider" />

                <h2 className="detail-section-title">Reviews</h2>
                {product.reviews?.length > 0 ? (
                  <div className="detail-reviews">
                    {product.reviews.map((r, i) => (
                      <div key={i} className="review-item">
                        <div className="review-header">
                          <span className="review-name">{r.reviewerName}</span>
                          <StarRating rating={r.rating} />
                          <span className="rating-count">({r.rating?.toFixed(1)})</span>
                        </div>
                        <p className="review-comment">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="detail-desc" style={{ color: "var(--gray-400)" }}>No reviews yet.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
