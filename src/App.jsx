import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Show from "./pages/Show";
import Profile from "./pages/Profile";
import WatchlistPage from "./pages/WatchlistPage";
import Lists from "./pages/Lists";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import ResetPassword from "./pages/ResetPassword";
import PageNotFound from "./pages/PageNotFound";
import SessionContextProvider from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import UpdatePassword from "./pages/UpdatePassword";
import Person from "./pages/Person";
import Season from "./pages/Season";
import Episode from "./pages/Episode";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // 60 seconds * 1000 miliseconds
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/:category/:id" element={<Show />} />
                <Route
                  path="/:category/:id/season/:seasonNum"
                  element={<Season />}
                />
                <Route
                  path="/:category/:id/season/:seasonNum/episode/:episodeNum"
                  element={<Episode />}
                />
                <Route path="person/:personId" element={<Person />} />
                <Route path={`:user`}>
                  <Route index element={<Profile />} />
                  <Route path="watchlist" element={<WatchlistPage />} />
                  <Route path="lists" element={<Lists />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="update-password" element={<UpdatePassword />} />
              </Route>

              <Route path="login" element={<AuthPage type="login" />} />
              <Route path="signup" element={<AuthPage type="signup" />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </SessionContextProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
