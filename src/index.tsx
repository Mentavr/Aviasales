import { createRoot } from "react-dom/client";
import { Provider as ProviderReduces } from "react-redux";
import "@/index.scss";
import App from "@/app/App";
import store from "@/store/store";
import { ContextProvider } from "./context/provider/contextProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <ProviderReduces store={store}>
    <ContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </ContextProvider>
  </ProviderReduces>,
);
