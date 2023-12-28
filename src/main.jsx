import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PopupProvider } from "./context/popups";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PopupProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PopupProvider>
);
