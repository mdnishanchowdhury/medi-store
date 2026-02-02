"use server";

import { orderService } from "@/services/order.server";
import { revalidateTag } from "next/cache";

export async function handleOrderAction(
    items: any[],
    shippingAddress: string,
    phoneNumber: string
) {
    const orderData = {
        shippingAddress: shippingAddress,
        phoneNumber: phoneNumber,
        items: items.map((item: any) => ({
            medicineId: item.id || item._id,
            quantity: item.qty,
            price: Number(item.price),
            sellerId: item.sellerId || "default_seller_id",
        })),
    };

    const res = await orderService.createOrder(orderData);
    if (res.data) {
        // revalidateTag('orders'); 
        revalidateTag('orders', '');
    }

    return res;
}

