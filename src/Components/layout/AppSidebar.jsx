import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Dock from "./Dock";
import { 
  Home,
  Plus,
  List,
  Settings,
  PieChart,
  Menu,   
  ChevronLeft,  
  Layout,
  User,
  KeyRound,

} from "lucide-react";
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

const itemsDocks = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Add Transaction", url: "/AddTransaction", icon: Plus },
  { title: "Transactions", url: "/Transactions", icon: List },
  { title: "Analytics", url: "/Analytics", icon: PieChart },
  { title: "Overview", url: "/Overview", icon: Layout }, 
  { title: "Settings", url: "/Setting", icon: Settings },
  { title: "Profile", url: "/Profile  ", icon: User },
]; 

const AppSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const items = [
    { title: "Dashboard", url: "/Dashbaord", icon: Home },
    { title: "Add Transaction", url: "/AddTransaction", icon: Plus },
    { title: "Transactions", url: "/Transactions", icon: List },
    { title: "Overview", url: "/Overview", icon: Layout }, 
    { title: "Analytics", url: "/Analytics", icon: PieChart },
    { title: "Profile", url: "/Profile", icon: User },
    { title: "SinUp", url: "/SignUp", icon: KeyRound },
    { title: "Login", url: "/", icon: KeyRound },

  ]; 

  const itemsDocks = [
    { icon: Home, label: "Dashbaord" , onclick: () => navigate('/Dashbaord')},
    { icon: Plus, label: "Add" ,  onclick:()  => navigate("/AddTransaction") },
    { icon: List, label: "Transactions",onclick:()  => navigate("/Transactions") },
    { icon: Layout, label: "Overview",onclick:()  => navigate("/Overview") },
    { icon: PieChart, label: "Analytics",onclick:()  => navigate("/Analytics") },
    { icon: User, label: "Profile",onclick:()  => navigate("/Profile") },
    { icon: User, label: "Sign Up",onclick:()  => navigate("/SignUp") },
    { icon: User, label: "Login",onclick:()  => navigate("/") },
  ]
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
        className={`fixed top-20 left-0 h-screen shadow-xl transition-all duration-300 z-50 
          ${isCollapsed ? "w-16" : "w-60"} 
          hidden md:block 
     bg-[#f7f7fa] border-none  
        `} 
      > 
            <SidebarContent   className="h-full bg-[#f7f7fa]" >
              <SidebarGroup >
                <div className="flex justify-between items-center mt-3 text-[#1E293B]">
                  
                  <Button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    variant="ghost"
                    className="rounded  bg-[#1E293B] hover:bg-[#1E293B]   "
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
                              ${active === item.url ? "bg-[#1f2937] text-white shadow-md px-1" : "hover:bg-[#1f2937] hover:text-white"}
                            `}
                          >
                            <item.icon className={`w-4 h-4 ${active === item.url ? "text-white" : "text-white-600"}`} />
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
       <Dock  items={itemsDocks} />
      )}
    </>
  );
};

export default AppSidebar;
