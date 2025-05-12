import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarSection.css";

export const SidebarSection = ({ children, title }) => (
  <div className="sidebar-section">
    {title && <div className="sidebar-section-title">{title}</div>}
    <div className="sidebar-section-items">{children}</div>
  </div>
);

SidebarSection.Item = ({ icon: Icon, label, to, iconColor = "blue", initial = null }) => {
  return (
    <NavLink to={to} className="sidebar-item">
      {initial ? (
        <div className={`sidebar-item-initial sidebar-item-initial-${iconColor}`}>
          {initial}
        </div>
      ) : (
        Icon && <Icon className="sidebar-item-icon" />
      )}
      <span className="sidebar-item-label">{label}</span>
    </NavLink>
  );
};
