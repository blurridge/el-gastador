import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/dashboard/Sidebar";
import ProfileSetup from "@/components/dashboard/ProfileSetup";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="w-full h-full">
          <ProfileSetup />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout;
