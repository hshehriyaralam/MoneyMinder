import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Home, Plus, List, Settings, PieChart, Menu, ChevronLeft } from "lucide-react";
import Dock from "@/Components/layout/Dock";
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Button } from "@/Components/ui/button";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Add Transaction", url: "/AddTransaction", icon: Plus },
  { title: "Transactions", url: "/Transaction", icon: List },
  { title: "Analytics", url: "/Analytics", icon: PieChart },
  { title: "Settings", url: "/Setting", icon: Settings },
];

const AppSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const itemsDock = [
    { title: "Dashboard", url: "/", icon: <VscHome size={20} />, onClick: () => navigate("/") },
    { title: "Add Transaction", url: "/AddTransaction", icon: <VscArchive size={20} />, onClick: () => navigate("/AddTransaction") },
    { title: "Transactions", url: "/Transaction", icon: <VscAccount size={20} />, onClick: () => navigate("/Transaction") },
    { title: "Settings", url: "/Setting", icon: <VscSettingsGear size={20} />, onClick: () => navigate("/Setting") },
  ];

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <SidebarProvider>
        {!isMobile && (
          <Sidebar
            className={`fixed top-20 left-0 h-screen bg-gray-100 shadow-xl transition-all duration-300 z-50 
              ${isCollapsed ? "w-16" : "w-60"} 
              hidden md:block
            `}
          >
            <SidebarContent>
              <SidebarGroup>
                <div className="flex justify-between items-center p-4 ">
                  
                  <Button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    variant="ghost"
                    className="rounded-full p-2"
                  >
                    {isCollapsed ? <Menu className="w-6 h-6 text-gray-600" /> : <ChevronLeft className="w-6 h-6 text-gray-600 " />}
                  </Button>
                </div>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2 mt-2">
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title} className="rounded-lg">
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className={`flex items-center px-5 py-3 rounded-lg transition-all duration-300 
                              ${active === item.url ? "bg-blue-600 text-white shadow-md" : "hover:bg-blue-500 hover:text-white"}
                            `}
                          >
                            <item.icon className={`w-6 h-6 ${active === item.url ? "text-white" : "text-blue-600"}`} />
                            {!isCollapsed && <span className="ml-4 font-medium">{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        )}
      </SidebarProvider>

      {isMobile && (
        <Dock 
          items={itemsDock}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white border-blue-900 text-white shadow-lg rounded-full px-3 py-2 flex justify-around w-[90%] max-w-md"
        />
      )}
    </>
  );
};

export default AppSidebar;
