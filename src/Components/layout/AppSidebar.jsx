import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Plus, List, Settings, PieChart, Menu, ChevronLeft } from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Add Transaction", url: "/AddTransaction", icon: Plus },
  { title: "Transactions", url: "/Transaction", icon: List },
  { title: "Analytics", url: "/Analytics", icon: PieChart },
  { title: "Settings", url: "/Setting", icon: Settings },
];

const AppSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <Sidebar
        className={`fixed top-20 left-0 h-screen bg-white shadow-lg text-gray-800 transition-all duration-300 
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        <SidebarContent>
          <SidebarGroup>
            <div className={`flex ${isCollapsed ? "justify-center" : "justify-end"} px-3 mt-5`}>
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                variant="outline"
                className="w-10 flex items-center"
              >
                {isCollapsed ? <Menu className="w-8 h-8" /> : <ChevronLeft className="w-8 h-8" />}
              </Button>
            </div>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2 text-xl mt-4">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="rounded-lg">
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center px-5 py-3 rounded-lg transition-all duration-300 
                          ${active === item.url ? "bg-blue-600 text-white shadow-md" : "hover:bg-blue-500 hover:text-black hover:shadow-md"}
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
    </SidebarProvider>
  );
};

export default AppSidebar;
