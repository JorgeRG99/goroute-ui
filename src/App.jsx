import "./App.css";
import { WebNavbar } from "./components/navbar/WebNavbar";
import { Home } from "./pages/Home";
import { PopupProvider } from "./context/popups";
import { LogoutPopup } from "./components/popups/LogoutPopup";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Error404 } from "./pages/Error404";

function App() {
  return (
    <>
      <PopupProvider>
        <WebNavbar />
        <LogoutPopup />

        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </PopupProvider>
    </>
  );
}

export default App;
