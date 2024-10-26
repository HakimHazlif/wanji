import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./sections/Navbar";

const App = () => {
  return (
    <div>
      <header className="padding-x">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
