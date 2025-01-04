import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import SignLog from "./pages/SignLog";
import Show from "./pages/Show";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import Lists from "./pages/Lists";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import ResetPassword from "./pages/ResetPassword";
import PageNotFound from "./pages/PageNotFound";
import SessionContextProvider from "./context/UserContext";

function App() {
  return (
    <SessionContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<Show isMovie={true} />} />
            <Route path="serie/:id" element={<Show isMovie={false} />} />
            <Route path={`:user`}>
              <Route index element={<Profile />} />
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="lists" element={<Lists />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="settings" element={<Settings />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Route>

          <Route path="login" element={<SignLog />} />
          <Route path="signup" element={<SignLog />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;
