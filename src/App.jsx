import "./App.css";
import { Home } from "./pages/Home";
import { LogoutPopup } from "./components/popups/authentication/LogoutPopup";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Error404 } from "./pages/Error404";
import { ActivitiesFeed } from "./pages/ActivitiesFeed";
import { usePopups, Popups } from "./hooks/usePopups";
import { RegisterActivityPopup } from "./components/popups/activity/RegisterActivityPopup";
import { useSports } from "./hooks/useSports";
import { LoggedNavbar } from "./components/navbar/logged/LoggedNavbar";
import { useAuth } from "./hooks/useAuth";
import { NotLoggedNavbar } from "./components/navbar/notlogged/NotLoggedNavbar";
import { NextUIProvider } from "@nextui-org/react";
import { Loader } from "./pages/Loader";
import { getFromStorage } from "./services/storage";

function App() {
  const userAuthToken = getFromStorage("AuthToken");
  const { isLoading } = useAuth();
  const { popups, togglePopup } = usePopups();
  const { sports } = useSports();
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <div className={userAuthToken && "flex"}>
        {userAuthToken ? (
          !isLoading ? (
            <LoggedNavbar />
          ) : undefined
        ) : (
          <NotLoggedNavbar />
        )}
        {popups[Popups.Logout] && (
          <LogoutPopup
            togglePopup={togglePopup}
            popups={popups}
            Popups={Popups}
          />
        )}
        {popups[Popups.AddActivity] && (
          <RegisterActivityPopup
            sports={sports}
            togglePopup={togglePopup}
            popups={popups}
            Popups={Popups}
          />
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
