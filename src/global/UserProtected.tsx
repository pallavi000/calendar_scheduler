import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "./GlobalContextProvider";

function UserProtected() {
  const { user } = useGlobalContext();
  return user ? <Outlet /> : <Navigate to={"/sign-in"} />;
}

export default UserProtected;
