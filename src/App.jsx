import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import Loader from "./components/common/Loader/Loader";
import "./App.css";

// Lazy load pages for better performance
const Home = React.lazy(() => import("./pages/Home/Home"));
const Catalog = React.lazy(() => import("./pages/Catalog/Catalog"));
const Details = React.lazy(() => import("./pages/Details/Details"));
const DesignCatalog = React.lazy(() =>
  import("./pages/DesignCatalog/DesignCatalog")
);

// Suspense fallback component
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      flexDirection: "column",
      gap: "16px",
    }}
  >
    <Loader text="Loading page..." />
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:id" element={<Details />} />
              <Route path="/design" element={<DesignCatalog />} />
            </Routes>
          </Suspense>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
