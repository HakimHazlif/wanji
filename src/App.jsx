import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./sections/Navbar";
import { useContext } from "react";
import { AppContext } from "./Context/AppProvider";
import Show from "./pages/Show";

const App = () => {
  const {isMovie} = useContext(AppContext)

  return (
    <div>
      <header className="padding-x">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        {
          isMovie 
          ? <Route path='/movie' element={<Show />} />
          : <Route path='/serie' element={<Show />} />
        }
        
      </Routes>
    </div>
  );
};

export default App;
