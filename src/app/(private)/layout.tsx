import { ReactNode } from 'react';

import ProfileSetupModal from '@/components/dashboard/ProfileSetupModal';
import AppSidebar from '@/components/dashboard/Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

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
    );
};

export default Layout;
