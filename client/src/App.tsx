import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";

// Providers
import GlobalContextProvider from "./global/GlobalContextProvider";
import ThemeProvider from "./theme/ThemeProvider";

import UserProtected from "./global/UserProtected";
// layouts
import AppLayout from "./layouts/AppLayout";
// css
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <ThemeProvider>
            <Routes>
              {/* app layout */}
              <Route element={<AppLayout />}>
                {/* public routes */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/register" element={<Register />} />

                {/* user protected routes */}
                <Route element={<UserProtected />}>
                  <Route path="/" element={<Home />} />
                </Route>
              </Route>
            </Routes>
          </ThemeProvider>
        </GlobalContextProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
