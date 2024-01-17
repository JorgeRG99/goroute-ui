import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { useUserSessionStore } from "./store/userSession";
import { Suspense, lazy } from "react";
import { PAGES_URLS } from "../config";

const YourProfile = lazy(() => import("./pages/YourProfile"));
const OtherUserProfile = lazy(() => import("./pages/OtherUserProfile"));
const Home = lazy(() => import("./pages/Home"));
const ActivitiesFeed = lazy(() => import("./pages/ActivitiesFeed"));
const PostsFeed = lazy(() => import("./pages/PostsFeed"));
const Messages = lazy(() => import("./pages/Messages"));
const Error404 = lazy(() => import("./pages/Error404"));
const NotLoggedNavbar = lazy(() =>
  import("./components/navbar/notlogged/NotLoggedNavbar")
);
const LoggedNavbar = lazy(() =>
  import("./components/navbar/logged/LoggedNavbar")
);
const Loader = lazy(() => import("./pages/Loader"));
const GlobalPopups = lazy(() => import("./components/popups/GlobalPopups"));

function App() {
  const isAuthenticated = useUserSessionStore((state) => state.isAuthenticated);
  const isLoading = useUserSessionStore((state) => state.isLoading);
  const appOrientation = isAuthenticated ? "flex" : "block";
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <div className={appOrientation}>
        {isAuthenticated ? (
          !isLoading ? (
            <>
              <Suspense fallback={<h1>...</h1>}>
                <GlobalPopups />
              </Suspense>
              <Suspense fallback={<h1>...</h1>}>
                <LoggedNavbar />
              </Suspense>
            </>
          ) : undefined
        ) : (
          <Suspense fallback={<h1>...</h1>}>
            <NotLoggedNavbar />
          </Suspense>
        )}
        <Routes>
          <Route
            path={PAGES_URLS.notFound}
            element={
              <Suspense fallback={<h1>...</h1>}>
                <Error404 />
              </Suspense>
            }
          />
          <Route
            path={PAGES_URLS.home}
            element={
              isAuthenticated ? (
                isLoading ? (
                  <Suspense fallback={<h1>...</h1>}>
                    <Loader />
                  </Suspense>
                ) : (
                  <Suspense fallback={<h1>...</h1>}>
                    <ActivitiesFeed />
                  </Suspense>
                )
              ) : (
                <Suspense fallback={<h1>...</h1>}>
                  <Home />
                </Suspense>
              )
            }
          />
          <Route
            path={PAGES_URLS.posts}
            element={
              isAuthenticated ? (
                isLoading ? (
                  <Suspense fallback={<h1>...</h1>}>
                    <Loader />
                  </Suspense>
                ) : (
                  <Suspense fallback={<h1>...</h1>}>
                    <PostsFeed />
                  </Suspense>
                )
              ) : (
                <Suspense fallback={<h1>...</h1>}>
                  <Home />
                </Suspense>
              )
            }
          />
          <Route
            path={PAGES_URLS.othersProfile}
            element={
              isAuthenticated ? (
                isLoading ? (
                  <Suspense fallback={<h1>...</h1>}>
                    <Loader />
                  </Suspense>
                ) : (
                  <Suspense fallback={<h1>...</h1>}>
                    <OtherUserProfile />
                  </Suspense>
                )
              ) : (
                <Navigate to={PAGES_URLS.home} replace />
              )
            }
          />
          <Route
            path={PAGES_URLS.yourProfile}
            element={
              isAuthenticated ? (
                isLoading ? (
                  <Suspense fallback={<h1>...</h1>}>
                    <Loader />
                  </Suspense>
                ) : (
                  <Suspense fallback={<h1>...</h1>}>
                    <YourProfile />
                  </Suspense>
                )
              ) : (
                <Navigate to={PAGES_URLS.home} replace />
              )
            }
          />
          <Route
            path={PAGES_URLS.chats}
            element={
              isAuthenticated ? (
                isLoading ? (
                  <Suspense fallback={<h1>...</h1>}>
                    <Loader />
                  </Suspense>
                ) : (
                  <Suspense fallback={<h1>...</h1>}>
                    <Messages />
                  </Suspense>
                )
              ) : (
                <Navigate to={PAGES_URLS.home} replace />
              )
            }
          />
          <Route
            path={PAGES_URLS.userChat}
            element={
              isAuthenticated ? (
                isLoading ? (
                  <Suspense fallback={<h1>...</h1>}>
                    <Loader />
                  </Suspense>
                ) : (
                  <Suspense fallback={<h1>...</h1>}>
                    <Messages />
                  </Suspense>
                )
              ) : (
                <Navigate to={PAGES_URLS.home} replace />
              )
            }
          />
        </Routes>
      </div>
    </NextUIProvider>
  );
}

export default App;
