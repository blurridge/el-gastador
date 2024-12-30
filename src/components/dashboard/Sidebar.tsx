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
import { useAuth } from "@/hooks/useAuth"
import ProfileSetup from "./ProfileSetup"
import useUserStore from "@/stores/userStore"
import { useEffect } from "react"

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
    const { signOut, isLoading, error } = useAuth()
    const { isMobile } = useSidebar();
    const { updateCurrentUser } = useUserStore();

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            updateCurrentUser();
        }
    }, [])

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
                                    <SidebarMenuButton onClick={signOut} asChild>
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
