import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
