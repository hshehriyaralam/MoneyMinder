
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Home, Plus, List, Settings, PieChart, Menu, ChevronLeft } from "lucide-react";
import Dock from "@/Components/layout/Dock";
import { RiDashboardLine, RiExchangeFundsLine, RiFileList3Line, RiPieChart2Line, RiSettings3Line } from "react-icons/ri";


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
    { title: "Dashboard", url: "/", icon: <RiDashboardLine size={20} />, onClick: () => navigate("/") },
    { title: "Add Transaction", url: "/AddTransaction", icon: <RiExchangeFundsLine size={20} />, onClick: () => navigate("/AddTransaction") },
    { title: "Transactions", url: "/Transaction", icon: <RiFileList3Line size={20} />, onClick: () => navigate("/Transaction") },
    { title: "Settings", url: "/Setting", icon: <RiSettings3Line size={20} />, onClick: () => navigate("/Setting") },
    { title: "Analytics", url: "/Analytics", icon: <RiPieChart2Line size={20} />, onClick: () => navigate("/Analytics") },
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
            className={`fixed top-24 left-0 h-screen bg-gray-100 shadow-xl transition-all duration-300 z-50 
              ${isCollapsed ? "w-16" : "w-60"} 
              hidden md:block
            `}
          >
            <SidebarContent>
              <SidebarGroup>
                <div className="flex justify-between items-center mt-3 text-white ">
                  
                  <Button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    variant="ghost"
                    className="rounded p-2 bg-blue-600  hover:bg-blue-600    "
                  >
                    {isCollapsed ? <Menu className="w-4 h-4 text-white relative " /> : <ChevronLeft className="w-4 h-4  text-white  " />}
                  </Button>
                </div>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2 mt-4">
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title} className="rounded-lg">
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className={`flex items-center  px-3 py-1 rounded-lg transition-all duration-300 
                              ${active === item.url ? "bg-blue-600 text-white shadow-md px-1" : "hover:bg-blue-500 hover:text-black"}
                            `}
                          >
                            <item.icon className={`w-4 h-4 ${active === item.url ? "text-white" : "text-blue-600"}`} />
                            {!isCollapsed && <span className="ml-3 font-medium">{item.title}</span>}
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
