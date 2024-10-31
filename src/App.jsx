import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./sections/Navbar";
import Show from "./pages/Show";

const App = () => {
  return (
    <div>
      <header className="padding-x">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Show isMovie={true} />} />
        <Route path="/serie/:id" element={<Show isMovie={false} />} />
      </Routes>
    </div>
  );
};

export default App;
