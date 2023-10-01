import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast, { Toast, ToastBar, Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import PremiumBonds from "./pages/PremiumBonds";
import IconButton from "./ui/IconButton";
import Budget from "./pages/Budget";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(`Something went wrong: ${error.message}`);
      }
    },
  }),
});

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />

        <BrowserRouter basename="app">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="budget" element={<Budget />} />
              <Route path="premium-bonds" element={<PremiumBonds />} />

              <Route path="settings" element={<Settings />} />
            </Route>

            <Route index element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3 * 1000,
            },
            error: {
              duration: 5 * 1000,
              iconTheme: {
                primary: "var(--color-error-harsh)",
                secondary: "white",
              },
            },
            style: {
              fontSize: "1.4rem",
            },
          }}
        >
          {(t: Toast) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <IconButton onClick={() => toast.dismiss(t.id)}>
                      <XMarkIcon />{" "}
                    </IconButton>
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
      </QueryClientProvider>
    </>
  );
};

export default App;
