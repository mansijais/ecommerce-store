import { useEffect, useState } from "react";
import { getCategories } from "../api/productApi";
import { useFilters } from "../context/FilterContext";

const Filters = ({
  filters,
  onCategoryChange,
  onBrandChange,
  onPriceApply,
  products,
}) => {
  const { sidebarOpen, setSidebarOpen } = useFilters();
  const [categories, setCategories] = useState([]);
  const [priceMin, setPriceMin] = useState(filters.min);
  const [priceMax, setPriceMax] = useState(filters.max);
  const [filterSearch, setFilterSearch] = useState("");
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);


  useEffect(() => {
    setPriceMin(filters.min);
    setPriceMax(filters.max);
  }, [filters.min, filters.max]);

  // Extract and deduplicate brands from products,then sort alphabetically.
  // This way brands list updates automatically when products change.
  const brands = products?.length
    ? [...new Set(products.map((p) => p.brand).filter(Boolean))].sort()
    : [];

  return (
    <>
    {sidebarOpen && <div className="sidebar-overlay" />}
      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
     
        <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
          ✕
        </button>
        <div className="sidebar-search">
          <span className="sidebar-search-icon">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
    
          <input
            type="text"
            placeholder="Search filters..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
        </div>

  
        <div className="filter-section">
          <h3>Categories</h3>
          {categories
            .filter((c) =>
              c.name.toLowerCase().includes(filterSearch.toLowerCase()),
            )
            .map((c) => (
              <label key={c.slug} className="category-item">
                <input
                  type="checkbox"
                  checked={filters.category === c.slug}
                  onChange={() => onCategoryChange(c.slug)}
                />
                {c.name}
              </label>
            ))}
        </div>

        <div className="filter-section">
          <h3>Price Range</h3>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>
          <button
            className="btn-apply"
            onClick={() => onPriceApply(priceMin, priceMax)}
          >
            Apply
          </button>
        </div>

        {brands.length > 0 && (
          <div className="filter-section">
            <h3>Brands</h3>
            {brands
              .filter((b) =>
                b.toLowerCase().includes(filterSearch.toLowerCase()),
              )
              .map((b) => (
                <label key={b} className="brand-item">
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(b)}
                    onChange={(e) => onBrandChange(b, e.target.checked)}
                  />
                  {b}
                </label>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Filters;
