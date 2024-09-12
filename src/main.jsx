import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import BirthDayDataProvider from "./Provider/BirthDayDataProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className=" max-w-7xl mx-auto">
    <HelmetProvider>
      <React.StrictMode>
        <AuthProvider>
          <BirthDayDataProvider>
            <RouterProvider router={router} />
          </BirthDayDataProvider>
        </AuthProvider>
      </React.StrictMode>
    </HelmetProvider>
  </div>
);
