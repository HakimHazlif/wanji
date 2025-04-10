import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SessionContextProvider from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import ListsContextProvider from "./context/ListsContext";
import { lazy, Suspense } from "react";
import Spinner from "./ui/Spinner";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const AppLayout = lazy(() => import("./components/AppLayout"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const Show = lazy(() => import("./pages/Show"));
const Profile = lazy(() => import("./pages/Profile"));
const List = lazy(() => import("./pages/List"));
const Settings = lazy(() => import("./pages/Settings"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Genre = lazy(() => import("./pages/Genre"));
const CreateNewList = lazy(() => import("./pages/CreateNewList"));
const EditList = lazy(() => import("./pages/EditList"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const Person = lazy(() => import("./pages/Person"));
const Season = lazy(() => import("./pages/Season"));
const Episode = lazy(() => import("./pages/Episode"));
const TvShows = lazy(() => import("./pages/TvShows"));
const Movies = lazy(() => import("./pages/Movies"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const lacation = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionContextProvider>
          <ListsContextProvider>
            <Suspense key={location} fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Home />} />

                  <Route path="movies" element={<Movies />} />
                  <Route path="tv-shows" element={<TvShows />} />
                  <Route
                    path="genre/:genre/:genreId/:category"
                    element={<Genre />}
                  />
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
                  <Route path={`u/:user`} element={<Profile />} />

                  <Route path="u/:user/settings" element={<Settings />}>
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="account" element={<AccountSettings />} />
                  </Route>

                  <Route path="u/:user/:list" element={<List />} />
                  <Route
                    path="u/:user/list/create"
                    element={<CreateNewList />}
                  />
                  <Route path="u/:user/:list/edit" element={<EditList />} />

                  {/* <Route path="u/:user/:list" element={<List />} /> */}

                  <Route path="reset-password" element={<ResetPassword />} />
                  <Route path="update-password" element={<UpdatePassword />} />
                </Route>

                <Route path="login" element={<AuthPage type="login" />} />
                <Route path="signup" element={<AuthPage type="signup" />} />

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
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "#faf7f5",
                },
              }}
            />
          </ListsContextProvider>
        </SessionContextProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
