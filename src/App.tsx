import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PremiumBonds from "./pages/PremiumBonds";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter basename="app">
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="premium-bonds" element={<PremiumBonds />} />
          </Route>

          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
