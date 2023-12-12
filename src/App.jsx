import "./App.css";
import { Home } from "./pages/Home";
import { LogoutPopup } from "./components/popups/LogoutPopup";
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

function App() {
  const { userData } = useAuth();
  const { popups, togglePopup } = usePopups();
  const { sports } = useSports();
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <div className={userData.authToken && "flex"}>
        {userData.authToken ? <LoggedNavbar /> : <NotLoggedNavbar />}
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
            element={userData.authToken ? <ActivitiesFeed /> : <Home />}
          />
          <Route
            path="/profile"
            element={
              userData.authToken ? <Profile /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
    </NextUIProvider>
  );
}

export default App;
