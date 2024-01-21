import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from 'react';
import { RouterProvider } from "react-router-dom";
import { Routes } from "./routing/Mainroute";
import {Notifications} from "./components/common/Main";
import ResizeObserverProvider from "./ResizeObserverProvider ";
import "antd/dist/reset.css";
import "./style/antd.css";
import "./style/main.css";
import "./style/print.css";
import "./style/responsive.css";
import "./style/extra.css";
import "./style/dragdrop.css"
import "./index.css";
import "tailwindcss/tailwind.css";
import "./App.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

      retry: (failureCount, error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403 ||
          error?.response?.status === 404
        ) {
          return false;
        }

        return failureCount < 1;
      },

      onError: (err) =>
        Notifications(
          "Error",
          `${err?.response?.data?.message}`,
          "error"
        ),
    },

    mutations: {
      onError: (err) =>
        Notifications(
          "Error",
          `${err?.response?.data?.message}`,
          "error"
        ),
    },
  },
});
function App() {

  return (
    <div className="App">
      <ResizeObserverProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Routes} />
        </QueryClientProvider>
      </ResizeObserverProvider>
    </div>
  );
}

export default React.memo(App);
