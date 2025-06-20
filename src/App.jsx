import { Route, Routes, useLocation } from "react-router-dom";
import SessionProvider from "./context/SessionContext";
import { Provider } from "react-redux";
import store from "./app/store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import ListsContextProvider from "./context/ListsContext";
import { lazy, Suspense } from "react";
import Spinner from "./ui/Spinner";
import { Toaster } from "react-hot-toast";
import PersonWorksProvider from "./context/PersonWorksContext";
import ProtectRoute from "./components/ProtectRoute";
import ListContextProvider from "./context/ListContext";

const Home = lazy(() => import("./pages/Home"));
const AppLayout = lazy(() => import("./components/AppLayout"));
const AuthPage = lazy(() => import("./features/authentication/pages/AuthPage"));
const VitualMedia = lazy(() =>
  import("./features/vitualMedia/pages/VisualMedia")
);
const Profile = lazy(() => import("./pages/Profile"));
const List = lazy(() => import("./features/userLists/pages/List"));
const Settings = lazy(() => import("./pages/Settings"));
const ResetPassword = lazy(() =>
  import("./features/authentication/pages/ResetPassword")
);
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Genre = lazy(() => import("./features/genre/pages/Genre"));
const CreateNewList = lazy(() => import("./pages/CreateNewList"));
const EditList = lazy(() => import("./pages/EditList"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const UpdatePassword = lazy(() =>
  import("./features/authentication/pages/UpdatePassword")
);
const Person = lazy(() => import("./features/person/pages/Person"));
const Season = lazy(() => import("./features/season/pages/Season"));
const Episode = lazy(() => import("./features/episode/pages/Episode"));
const TvShows = lazy(() => import("./features/tv/pages/TvShows"));
const Movies = lazy(() => import("./features/movies/pages/Movies"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      // cacheTime: 1000 * 60 * 60 * 24,
      suspense: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ListsContextProvider>
          <SessionProvider>
            <Suspense key={location.pathname} fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Home />} />

                  <Route path="movies" element={<Movies />} />
                  <Route path="tv-shows" element={<TvShows />} />
                  <Route
                    path="genre/:genre/:genreId/:category"
                    element={<Genre />}
                  />
                  <Route path="/:category/:id" element={<VitualMedia />} />
                  <Route
                    path="/:category/:id/season/:seasonNum"
                    element={<Season />}
                  />
                  <Route
                    path="/:category/:id/season/:seasonNum/episode/:episodeNum"
                    element={<Episode />}
                  />
                  <Route
                    path="person/:personId"
                    element={
                      <PersonWorksProvider>
                        <Person />
                      </PersonWorksProvider>
                    }
                  />

                  <Route
                    path={`u/:user`}
                    element={
                      <ProtectRoute>
                        <Profile />
                      </ProtectRoute>
                    }
                  />

                  <Route
                    path="u/:user/settings"
                    element={
                      <ProtectRoute>
                        <Settings />
                      </ProtectRoute>
                    }
                  >
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="account" element={<AccountSettings />} />
                  </Route>

                  <Route
                    path="u/:user/:list"
                    element={
                      <ListContextProvider>
                        <ProtectRoute>
                          <List />
                        </ProtectRoute>
                      </ListContextProvider>
                    }
                  />
                  <Route
                    path="u/:user/list/create"
                    element={
                      <ProtectRoute>
                        <CreateNewList />
                      </ProtectRoute>
                    }
                  />
                  <Route
                    path="u/:user/list/:listId/edit"
                    element={
                      <ListContextProvider>
                        <ProtectRoute>
                          <EditList />
                        </ProtectRoute>
                      </ListContextProvider>
                    }
                  />
                </Route>

                <Route path="login" element={<AuthPage type="login" />} />
                <Route path="signup" element={<AuthPage type="signup" />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="update-password" element={<UpdatePassword />} />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                  style: {
                    color: "green",
                  },
                },
                error: {
                  duration: 5000,
                  style: {
                    color: "red",
                  },
                },
                style: {
                  fontSize: "16px",
                  fontWeight: "500",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "#faf7f5",
                },
              }}
            />
          </SessionProvider>
        </ListsContextProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
