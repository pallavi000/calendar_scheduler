import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import GlobalContextProvider from "./global/GlobalContextProvider";
import ThemeProvider from "./theme/ThemeProvider";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import UserProtected from "./global/UserProtected";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
