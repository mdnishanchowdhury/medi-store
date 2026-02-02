import { Order } from "@/types/order";
import { cookies } from "next/headers";
const API_URL = process.env.API_URL;
interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}
export const orderService = {
    createOrder: async function (orderData: any) {
        try {
            const cookiesStore = await cookies();

            const res = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookiesStore.toString(),
                },
                body: JSON.stringify(orderData),
                cache: "no-store",
            });

            const responseText = await res.text();
            let result;
            try {
                result = responseText ? JSON.parse(responseText) : {};
            } catch (e) {
                result = {};
            }

            if (!res.ok) {
                throw new Error(result.message || `Error ${res.status}: Order failed`);
            }

            return { data: result.data, error: null };
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    },

    getOrderById: async function (orderId: string) {
        try {
            const cookiesStore = await cookies();
            const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
                headers: {
                    cookie: cookiesStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to fetch order");

            return { data: result.data, error: null };
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    },

    myOrders: async (): Promise<Order[]> => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/api/orders`, {
                headers: {
                    cookie: cookieStore.toString(), // send auth cookie
                },
                cache: "no-store",
            });

            if (!res.ok) throw new Error("Failed to fetch orders");

            const result = await res.json();

            return result.data || [];
        } catch (err) {
            console.error("Order fetch error:", err);
            return [];
        }
    },

};
