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
import ProtectedRoute from "./ui/ProtectedRoute";
import Account from "./pages/Account";
import MiniSpinner from "./ui/MiniSpinner";
import styled from "styled-components";
import { UserProvider } from "./context/UserProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
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

const StyledLoadingToastSpinnerContainer = styled.span`
  padding: 6px 0;
  display: flex;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <UserProvider>
          <BrowserRouter basename="app">
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="budget" element={<Budget />} />
                <Route path="premium-bonds" element={<PremiumBonds />} />

                <Route path="account" element={<Account />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route
                index
                element={
                  <ProtectedRoute redirectUrl="/dashboard" noAuth>
                    <Login />
                  </ProtectedRoute>
                }
              />

              <Route
                path="*"
                element={<PageNotFound titleError="FIRECracker | Error 404" />}
              />
            </Routes>
          </BrowserRouter>
        </UserProvider>

        <Toaster
          position="top-right"
          gutter={12}
          containerClassName={"toaster-container"}
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
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              background: "rgba(255, 255, 255, 0.9)",
              transition: "background 0.2s ease-in-out",
            },
          }}
        >
          {(t: Toast) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {t.type === "loading" ? (
                    <StyledLoadingToastSpinnerContainer>
                      <MiniSpinner size="20px" />
                    </StyledLoadingToastSpinnerContainer>
                  ) : (
                    icon
                  )}
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
