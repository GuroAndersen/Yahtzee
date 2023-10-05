import React from "react";
import { TabMenu } from "primereact/tabmenu";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Home", icon: "pi pi-fw pi-home", path: "/", index: 0 },
    { label: "Play", icon: "pi pi-fw pi-play", path: "/players", index: 1 },
    { label: "Help", icon: "pi pi-fw pi-question", path: "/help", index: 2 },
  ];

  const activeItem = items.find((item) => item.path === location.pathname);
  console.log(activeItem);

  const handleTabToChange = (e) => {
    navigate(e.value.path);
  };

  return (
    <div className="card">
      <TabMenu
        model={items}
        onTabChange={handleTabToChange}
        activeIndex={activeItem?.index ?? 1}
      />
    </div>
  );
}
