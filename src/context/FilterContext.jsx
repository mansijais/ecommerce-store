import { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: "",
    min: "",
    max: "",
    brand: [],
  });
  const [page, setPage] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // Debounced search - delays filtering by 300ms to avoid too many re-renders
  // User types quickly, but we only filter after they pause
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);
  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        page,
        setPage,
        sidebarOpen,
        setSidebarOpen,
        search,
        setSearch,
        debouncedSearch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
