import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as Components from "./components";
import Home from "./pages/home";
import { FileProvider } from "./contexts/file-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Components.Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Components.NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FileProvider>
  </React.StrictMode>
);
