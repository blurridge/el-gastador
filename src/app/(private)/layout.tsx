import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/dashboard/Sidebar";
import ProfileSetup from "@/components/dashboard/ProfileSetup";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <ProfileSetup />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default Layout;
