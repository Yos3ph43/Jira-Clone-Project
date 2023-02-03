import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AppRoute = ({ element: Comp, isPrivate }) => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.profile);
  if (isPrivate) {
    if (token && user) return <Comp />;
    // window.alert("Hãy đăng nhập để sử dụng tính năng này");
    return <Navigate to="/auth/login" replace />;
  }
};

export default AppRoute;
