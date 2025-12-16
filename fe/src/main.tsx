import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// import ReduxProvider from "./app/providers/ReduxProvider";
import QueryProvider from "./app/providers/QueryProvider";
import { queryClient } from "./lib/queryClient";
import SocketProvider from "./app/providers/SocketProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ReduxProvider> */}
      <SocketProvider>
        <QueryProvider client={queryClient}>
          <App />
        </QueryProvider>
        {/* </ReduxProvider> */}
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
