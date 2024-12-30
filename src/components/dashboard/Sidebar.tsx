'use client'
import { Home, Settings, LogOut, HandCoins, Coins } from "lucide-react"
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
} from "@/components/ui/sidebar"
import ProfileSetup from "./ProfileSetup"
import { useSignOut } from "@/features/auth"

const items = [
    {
        title: "Home",
        url: "home",
        icon: Home,
    },
    {
        title: "Transactions",
        url: "transactions",
        icon: Coins,
    },
    {
        title: "Debt",
        url: "debt",
        icon: HandCoins
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

const AppSidebar = () => {
    const { isMobile } = useSidebar();
    const { refetch: signOut } = useSignOut();

    return (
        <>
            <Sidebar variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
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
                                <SidebarMenuItem key={"Account Details"}>
                                    <SidebarMenuButton asChild>
                                        <ProfileSetup editMode={true} />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem key={"Sign Out"}>
                                    <SidebarMenuButton onClick={() => signOut()} asChild>
                                        <a className="cursor-pointer">
                                            <LogOut />
                                            <span>Sign Out</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarFooter>
            </Sidebar>
            {isMobile ? <SidebarTrigger /> : null}
        </>
    )
}

export default AppSidebar;
