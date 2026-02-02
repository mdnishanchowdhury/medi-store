"use client";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, X, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { handleOrderAction } from "@/actions/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CartDropdown() {
    const router = useRouter();
    const { items, removeItem, clearCart } = useCartStore() as any;

    const subtotal = items.reduce(
        (sum: number, item: any) => sum + item.price * item.qty,
        0
    );

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
        }).format(price);
    };

    const handleCheckout = async () => {
        if (items.length === 0) {
            return toast.error("Your cart is empty!");
        }

        const address = "Dhanmondi, Dhaka";
        const phone = "017XXXXXXXX";

        toast.promise(handleOrderAction(items, address, phone), {
            loading: 'Processing your order...',
            success: (res) => {
                if (res.error) {
                    throw new Error(res.error);
                }

                clearCart();

                setTimeout(() => {
                    router.push("/orders");
                }, 1500);

                return "Order successful! Redirecting to tracking...";
            },
            error: (err) => {
                return `Order failed: ${err.message}`;
            },
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="size-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            {items.length}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-96 p-5 mr-4 rounded-xl shadow-xl" align="end">
                <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>

                {items.length === 0 ? (
                    <div className="py-10 text-center space-y-3">
                        <p className="text-sm text-muted-foreground">Your cart is empty</p>
                        <Button
                            className="w-full rounded-xl gap-2"
                            variant="outline"
                            onClick={() => router.push("/orders")}
                        >
                            <PackageSearch className="size-4" />
                            Track Previous Orders
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                            {items.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 border rounded-lg p-2 hover:bg-muted transition"
                                >
                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-slate-50">
                                        <img
                                            src={item.image || "/api/placeholder/64/64"}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
                                        <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                                        <p className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</p>
                                    </div>

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <X className="size-4 text-muted-foreground hover:text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Separator className="my-4" />

                        <div className="flex justify-between text-base font-semibold mt-3">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button
                                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
                                onClick={handleCheckout}
                            >
                                Order Now
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full rounded-xl gap-2"
                                onClick={() => router.push("/orders")}
                            >
                                <PackageSearch className="size-4" />
                                Order Tracking
                            </Button>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}