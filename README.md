# E-Commerce App

##  Setup Instructions

1. Clone the repository:
   git clone https://github.com/mansijais/ecommerce-store.git
   cd E-Cart


##
2. Install dependencies:
npm install

##
3. Run the app:
npm run dev

##
4. Open in browser:
http://localhost:5173

## Assumptions Made
1. API provides paginated product data.
2. Filtering (category, brand, price) is handled on the frontend after data fetch.
3. Sidebar search is used to filter categories and brands (not products).
4. Top search bar is used for product-level search.
5. Sidebar open on hamburger menu click


## Architectural Decisions
1. Used React functional components with hooks for simplicity and readability.
2. Global state (filters, pagination, sidebar toggle, search) managed using Context API.
3. Separation of concerns:
    components/ → UI components
    pages/ → main screens
    context/ → global state
    api/ → API calls
4. Pagination handled differently:
    API pagination when no filters
    Client-side pagination when filters or search are applied


## Features Implemented
1. Product listing with pagination
2. Category, brand, and price filtering
3. Sidebar toggle - on hamburger menu click
4. Search functionality (top bar)
5. Sidebar filter search (categories & brands)
6. Added debounced search for better performance

## Improvements (if given more time)
1. Add loading skeletons for better UX
2. Add URL query params for shareable filter state
3. Improve mobile responsiveness (drawer-style sidebar)

## Tech Stack
1. React (Vite)
2. javascript
3. CSS (custom styling)
4. Context API for state management