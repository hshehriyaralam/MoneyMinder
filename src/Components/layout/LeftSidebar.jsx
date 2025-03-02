import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Plus, List, Settings, ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/Components/ui/sidebar";

const LeftSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Automatically collapse sidebar on mobile screens
  useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth <= 768;
      setIsMobile(isMobileScreen);
      setIsCollapsed(isMobileScreen); // Collapse sidebar on mobile by default
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar links
  const links = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Add Transactions", url: "/add-transactions", icon: Plus },
    { title: "Transactions", url: "/transactions", icon: List },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <Sidebar
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 z-50
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobile && !isCollapsed ? "w-64" : ""}
        `}
      >
        <SidebarContent>
          <SidebarGroup>
            {/* Toggle Button */}
            <div className={`flex ${isCollapsed ? "justify-center" : "justify-end"} p-3`}>
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                variant="ghost"
                size="sm"
                className="hover:bg-blue-100"
              >
                {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </Button>
            </div>

            {/* Sidebar Links */}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {links.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={link.url}
                        className={`flex items-center p-3 rounded-lg transition-all duration-200
                          ${
                            location.pathname === link.url
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                          }
                        `}
                      >
                        <link.icon className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"}`} />
                        {!isCollapsed && <span className="font-medium">{link.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Mobile Toggle Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="outline"
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      )}
    </SidebarProvider>
  );
};

export default LeftSidebar;