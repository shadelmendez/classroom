import React, { useEffect, useState } from "react";
import { SidebarSection } from "./SidebarSection";
import { Home, Calendar, Settings } from "lucide-react";
import { getSidebarData } from "../api/sidebar";
import "./Sidebar.css";

export const Sidebar = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getSidebarData();
      setSections(data);
    };
    load();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span role="img" aria-label="Classroom">
          📚
        </span>{" "}
        Classroom
      </div>

      <SidebarSection>
        <SidebarSection.Item icon={Home} label="Inicio" to="/" />
        <SidebarSection.Item icon={Calendar} label="Calendario" to="/calendar" />
      </SidebarSection>

      {sections.map((section, idx) => (
        <SidebarSection key={idx} title={section.title}>
          {section.items.map((item) => (
            <SidebarSection.Item
              key={item.to}
              label={item.label}
              to={item.to}
              initial={item.initial}
              iconColor={item.iconColor}
            />
          ))}
        </SidebarSection>
      ))}

      <SidebarSection>
        <SidebarSection.Item icon={Settings} label="Ajustes" to="/ajustes" />
      </SidebarSection>
    </aside>
  );
};
