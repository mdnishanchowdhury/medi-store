import { Route } from "@/types";

export const customerRoutes: Route[] = [
    {
        title: "Customer Management",
        items: [
            {
                title: "My Orders",
                url: "/customer-dashboard/myOrders",
            },
            {
                title: "Profile",
                url: "/customer-dashboard/profile",
            }
        ],
    },
]