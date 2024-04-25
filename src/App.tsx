import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import GlobalContextProvider from "./global/GlobalContextProvider";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
  return (
    <Router>
      <GlobalContextProvider>
        <ThemeProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
