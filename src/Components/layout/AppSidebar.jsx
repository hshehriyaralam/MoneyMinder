import { useState } from "react";
import { Calendar, Home, Inbox, Search, Settings, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/Inbox", icon: Inbox },
  { title: "Calendar", url: "/Calendar", icon: Calendar },
  { title: "Search", url: "/Search", icon: Search },
  { title: "Settings", url: "/Setting", icon: Settings },
];

const AppSidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider>
      {/* Sidebar Toggle Button (Mobile Only) */}
      <Button
        onClick={() => setOpen(!open)}
        variant="outline"
        className="m-4 md:hidden"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Sidebar with Fixed Width */}
      <Sidebar className="w-64 h-full bg-gray-100 text-black transition-transform">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-600 px-4 py-2">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="hover:bg-gray-200 rounded-md">
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-3 px-4 py-2">
                        <item.icon className="w-5 h-5 text-black" />
                        <span className="text-black">{item.title}</span> {/* Black Text */}
                      </a>
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
