import "./App.css";
import { Home } from "./pages/Home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Error404 } from "./pages/Error404";
import { ActivitiesFeed } from "./pages/ActivitiesFeed";
import { LoggedNavbar } from "./components/navbar/logged/LoggedNavbar";
import { useAuth } from "./hooks/useAuth";
import { NotLoggedNavbar } from "./components/navbar/notlogged/NotLoggedNavbar";
import { NextUIProvider } from "@nextui-org/react";
import { Loader } from "./pages/Loader";
import { getFromStorage } from "./services/storage";
import { GlobalPopups } from "./components/popups/GlobalPopups";

function App() {
  const userAuthToken = getFromStorage("AuthToken");
  const { isLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <div className={userAuthToken && "flex"}>
        <GlobalPopups />
        {userAuthToken ? (
          !isLoading ? (
            <LoggedNavbar />
          ) : undefined
        ) : (
          <NotLoggedNavbar />
        )}
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route
            path="/"
            element={
              userAuthToken ? (
                isLoading ? (
                  <Loader />
                ) : (
                  <ActivitiesFeed />
                )
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/:username"
            element={
              userAuthToken ? (
                !isLoading ? (
                  <Profile />
                ) : (
                  <Loader />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </NextUIProvider>
  );
}

export default App;
