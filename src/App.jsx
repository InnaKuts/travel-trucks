import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavigation from "./components/features/AppNavigation/AppNavigation";
import DesignCatalog from "./pages/DesignCatalog/DesignCatalog";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DesignCatalog />} />
            <Route path="/catalog" element={<DesignCatalog />} />
            <Route path="/design" element={<DesignCatalog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
