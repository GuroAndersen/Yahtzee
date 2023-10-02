import React from "react";
import { PrimeIcons } from "primereact/api";
import { TabMenu } from "primereact/tabmenu";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const items = [
    { label: "Home", icon: "pi pi-fw pi-home", path: "/" },
    { label: "Play", icon: "pi pi-fw pi-play", path: "/players" },
    { label: "Help", icon: "pi pi-fw pi-question", path: "/help" },
  ];

  const handleTabToChange = (e) => {
    navigate(e.value.path);
  };

  return (
    <div className="Header-component">
      <TabMenu model={items} onTabChange={handleTabToChange} />
    </div>
  );
}
