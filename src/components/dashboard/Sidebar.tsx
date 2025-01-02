'use client';
import { Home, Settings, LogOut, HandCoins, Coins } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import ProfileSetupModal from './ProfileSetupModal';
import { useSignOut } from '@/features/auth';
import Link from 'next/link';

const items = [
    {
        title: 'Home',
        url: 'home',
        icon: Home,
    },
    {
        title: 'Transactions',
        url: 'transactions',
        icon: Coins,
    },
    {
        title: 'Debt',
        url: 'debt',
        icon: HandCoins,
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings,
    },
];

const AppSidebar = () => {
    const { isMobile } = useSidebar();
    const { refetch: signOut } = useSignOut();

    // Tip: Use <Link /> components instead of <a> tags to prevent layout rerenders
    return (
        <>
            <Sidebar variant="inset">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarGroup>
                        <SidebarGroupLabel>Account</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem key={'Account Details'}>
                                    <SidebarMenuButton asChild>
                                        <ProfileSetupModal editMode={true} />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem key={'Sign Out'}>
                                    <SidebarMenuButton onClick={() => signOut()} asChild>
                                        <div className="cursor-pointer">
                                            <LogOut />
                                            <span>Sign Out</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarFooter>
            </Sidebar>
            {isMobile ? <SidebarTrigger /> : null}
        </>
    );
};

export default AppSidebar;
