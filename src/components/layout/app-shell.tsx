"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Map,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "../icons/logo";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/contributors",
    icon: Users,
    label: "Contribuyentes",
  },
  {
    href: "/technician",
    icon: Map,
    label: "Vista de Técnico",
  },
  {
    href: "/reports",
    icon: FileText,
    label: "Reportes",
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('mock_session');
      await signOut(auth);
      // Force reload or redirect to ensure provider state clears if it was relying on storage
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-r border-sidebar-border"
        variant="sidebar"
      >
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                  }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={{
                  children: "Ajustes",
                }}
              >
                <Link href="#">
                  <Settings />
                  <span>Ajustes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="font-headline text-lg font-semibold">
              {navItems.find(item => item.href === pathname)?.label || 'Tlapa Multiservicios'}
            </h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
                  <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.displayName || 'Usuario'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ajustes</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
