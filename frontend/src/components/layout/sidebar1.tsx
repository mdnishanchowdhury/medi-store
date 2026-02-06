import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"

import { Route } from "@/types"
import { Roles } from "@/constants/roles"
import { customerRoutes } from "@/routes/customerRoutes"
import { sellerRoutes } from "@/routes/sellerRouter"

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string }
} & React.ComponentProps<typeof Sidebar>) {

  let routes: Route[] = []

  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes
      break

    case Roles.customer:
      routes = customerRoutes
      break

    case Roles.seller:
      routes = sellerRoutes
      break

    default:
      routes = []
      break
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, index) => (
                  <SidebarMenuItem key={`${item.title}-${index}`}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
