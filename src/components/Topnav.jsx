import { useFilters } from "../context/FilterContext";

import searchIcon from "../assets/search.svg";
import cartIcon from "../assets/cart.svg";
import clockIcon from "../assets/clock.svg";
import userIcon from "../assets/user.svg";

const Topnav = ({ showToggle = false }) => {
  const { setSidebarOpen, setSearch } = useFilters();

  return (
    <nav className="topnavbar">
      <button
        className="topnavbar-menu"
        aria-label="Toggle filters"
        onClick={() => showToggle && setSidebarOpen((v) => !v)}
        style={{ cursor: showToggle ? "pointer" : "default" }}
      >
        <span />
        <span />
        <span />
      </button>

   
      <div className="topnavbar-search">
        <span className="topnavbar-search-icon">
          <img src={searchIcon} alt="search" />
        </span>

        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

   
      <div className="topnavbar-icons">
        <button aria-label="Cart">
          <img src={cartIcon} alt="cart" />
        </button>

        <button aria-label="Clock">
          <img src={clockIcon} alt="clock" />
        </button>

        <button aria-label="User">
          <img src={userIcon} alt="user" />
        </button>
      </div>
    </nav>
  );
};

export default Topnav;