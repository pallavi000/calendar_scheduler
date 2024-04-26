import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function AppLayout() {
  return (
    <>
      <Navbar />
      <Box minHeight={"90vh"}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default AppLayout;
