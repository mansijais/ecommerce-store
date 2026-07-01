const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i} className="star-filled">★</span>);
    } else if (rating >= i - 0.5) {
      stars.push(<span key={i} className="star-half">★</span>);
    } else {
      stars.push(<span key={i} className="star-empty">★</span>);
    }
  }
  return <div className="stars">{stars}</div>;
};

export default StarRating;
