import "./App.css";
import { WebNavbar } from "./components/WebNavbar";
import { Home } from "./pages/Home";
import { PopupProvider } from "./context/popups";

function App() {
  return (
    <>
      <PopupProvider>
        <WebNavbar />
        <Home />
      </PopupProvider>
    </>
  );
}

export default App;
