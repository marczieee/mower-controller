import { RouterProvider } from "react-router-dom";
import "./App.css";

// Router
import router from "./router";
import PWAInstallPrompt from "./components/custom/pwa/PWAInstallPrompt";

function App() {
  return (
    <>
      <PWAInstallPrompt />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
