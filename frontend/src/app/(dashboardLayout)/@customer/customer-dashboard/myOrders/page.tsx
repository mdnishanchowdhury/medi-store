import { orderService } from "@/services/order.server";
import { Order } from "@/types/order";
import OrderTrackingVisual from "@/components/layout/OrderTrackingVisual";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
    const orders: Order[] = await orderService.myOrders();

    const pendingOrders = orders.filter(order => order.status !== "DELIVERED");

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">My Orders</h1>

            <p className="text-gray-600 mb-4">
                Total Orders: <span className="font-semibold">{pendingOrders.length}</span>
            </p>

            {pendingOrders.length === 0 && (
                <p className="text-gray-500">You have no pending orders.</p>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingOrders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold text-gray-700">Order ID:</p>
                            <p className="text-sm text-gray-500">{order.id.slice(0, 8)}</p>
                        </div>

                        <div className="mb-2 flex justify-between items-center">
                            <span
                                className={`px-2 py-1 text-sm rounded-full font-medium ${order.status === "PLACED"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : order.status === "SHIPPED"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {order.status}
                            </span>
                            <p className="text-sm text-gray-500">{order.totalAmount}৳</p>
                        </div>

                        <div className="mb-3">
                            <p className="font-semibold text-gray-700">Shipping:</p>
                            <p className="text-sm text-gray-500">{order.shippingAddress}</p>
                            <p className="text-sm text-gray-500">{order.phoneNumber}</p>
                        </div>

                        <div className="mb-3">
                            <p className="font-semibold text-gray-700 mb-1">Items:</p>
                            <div className="space-y-2">
                                {order.orderItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 border p-2 rounded hover:bg-gray-50 transition"
                                    >
                                        <img
                                            src={item.medicine.image}
                                            alt={item.medicine.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-700">
                                                {item.medicine.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Qty: {item.quantity} × {item.price}৳
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <OrderTrackingVisual currentStatus={order.status as any} />
                    </div>
                ))}
            </div>
        </div>
    );
}
