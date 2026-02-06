import { AppSidebar } from "@/components/layout/sidebar1"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/roles"
import { userService } from "@/services/user.service"
import React from "react"

export default async function Page({
  admin,
  customer,
  seller,
}: {
  admin: React.ReactNode
  customer: React.ReactNode
  seller: React.ReactNode
}) {
  const { data } = await userService.getSession()
  const userInfo = data?.user

  if (!userInfo) return null

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{userInfo.role}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Roles.admin && admin}
          {userInfo.role === Roles.customer && customer}
          {userInfo.role === Roles.seller && seller}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
