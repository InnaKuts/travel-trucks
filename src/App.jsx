import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./pages/Home/Home";
import DesignCatalog from "./pages/DesignCatalog/DesignCatalog";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<DesignCatalog />} />
            <Route path="/design" element={<DesignCatalog />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
