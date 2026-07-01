import { useEffect, useState } from "react";
import { getProducts, getByCategory } from "../api/productApi";
import { useFilters } from "../context/FilterContext";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Topnav from "../components/Topnav";

const LIMIT = 12;
const TOTAL_PRODUCTS = 194;

// using hybrid pagination approach:-
// - API pagination when no filters (faster, less data)
// - Client-side pagination when filtering 
const ProductList = () => {
  const { filters, setFilters, page, setPage, search, debouncedSearch } =
    useFilters();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(TOTAL_PRODUCTS);

  useEffect(() => {
    fetchData();
  }, [filters.category, page, debouncedSearch]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const limitToUse = search ? 100 : LIMIT;
      const skipToUse = search ? 0 : page * LIMIT;

      if (filters.category) {
        const data = await getByCategory(filters.category);
        setAllProducts(data.products || []);
        setTotalCount(data.products?.length || 0);
      } else {
        const data = await getProducts(limitToUse, skipToUse);
        setAllProducts(data.products || []);
        setTotalCount(data.total || TOTAL_PRODUCTS);
      }
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleCategoryChange = (slug) => {
    const next = filters.category === slug ? "" : slug;
    setPage(0);
    setFilters({ ...filters, category: next, brand: [] });
  };

  const handleBrandChange = (brand, checked) => {
    const next = checked
      ? [...filters.brand, brand]
      : filters.brand.filter((b) => b !== brand);
    setFilters({ ...filters, brand: next });
  };

  const handlePriceApply = (min, max) => {
    setPage(0);
    setFilters({ ...filters, min, max });
  };

  // apply all active filters on client side
  // this gives instant feedback when user changes filters
  const filteredProducts = allProducts.filter((p) => {
    const min = Number(filters.min);
    const max = Number(filters.max);

    const okMin = !filters.min || p.price >= min;
    const okMax = !filters.max || p.price <= max;
    const okBrand =
      filters.brand.length === 0 || filters.brand.includes(p.brand);
    const okSearch =
      !debouncedSearch ||
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    return okMin && okMax && okBrand && okSearch;
  });

  const displayProducts =
    filters.category ||
    filters.brand.length ||
    filters.min ||
    filters.max ||
    search
      ? filteredProducts.slice(page * LIMIT, (page + 1) * LIMIT)
      : filteredProducts;
  const isFiltering =
    filters.category ||
    filters.brand.length > 0 ||
    filters.min ||
    filters.max ||
    search;

  const totalPages = isFiltering
    ? Math.max(1, Math.ceil(filteredProducts.length / LIMIT))
    : Math.max(1, Math.ceil(totalCount / LIMIT));
  return (
    <>
      <Topnav showToggle />
      <Filters
        filters={filters}
        onCategoryChange={handleCategoryChange}
        onBrandChange={handleBrandChange}
        onPriceApply={handlePriceApply}
        products={allProducts}
      />

      <div className="product-page-layout">
        <div className="main-content">
          {error && <div className="main-error-state"> {error}</div>}

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              Loading products…
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="product-empty-state">
              No products match your filters.
            </div>
          ) : (
            <div className="product-grid">
              {displayProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
