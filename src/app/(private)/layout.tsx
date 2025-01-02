import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/dashboard/Sidebar";
import ProfileSetupModal from "@/components/dashboard/ProfileSetupModal";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="w-full h-full">
          <ProfileSetupModal />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout;
