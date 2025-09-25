import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Catalog from "./pages/Catalog/Catalog";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
