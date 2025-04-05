import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Cloud, Leaf, BarChart3, Settings, Network, User } from "lucide-react";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home /> },
    { name: "Advisory", path: "/dashboard/advisory", icon: <User /> },
    { name: "Soil Health", path: "/dashboard/soiladvisory", icon: <BarChart3 /> },
    { name: "FPO", path: "/dashboard/fpo", icon: <Network /> },
    { name: "Mandi Rates", path: "/dashboard/market-prices", icon: <Network /> },
    { name: "Market", path: "/dashboard/market", icon: <User /> },
    { name: "Schemes", path: "/dashboard/schemes", icon: <User /> },
    { name: "Learning", path: "/dashboard/learning", icon: <Network /> },
    { name: "community", path: "/dashboard/community", icon: <Network /> },
 
  
    
    
 
  ];

  return (
    <div
      className={`bg-green-900 text-white h-screen p-4 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <ul className="space-y-4 mt-16">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                location.pathname === item.path ? "bg-green-700" : "hover:bg-green-800"
              }`}
            >
              {item.icon}
              <span className={`${isSidebarOpen ? "block" : "hidden"} transition-all duration-300`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Sidebar;
