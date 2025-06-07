import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import Details from "./pages/Details/Details";
import DesignCatalog from "./pages/DesignCatalog/DesignCatalog";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<Details />} />
            <Route path="/design" element={<DesignCatalog />} />
          </Routes>
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
