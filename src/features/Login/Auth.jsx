import React from "react";
import { Link, Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-4/6 bg-sky-800"></div>
      <div className="w-2/6">
        <h2 className="text-center">JIRA CLONE PROJECT</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
