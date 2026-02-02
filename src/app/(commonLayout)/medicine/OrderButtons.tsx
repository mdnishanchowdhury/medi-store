"use client";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export default function OrderButtons({ medicineId, name, price, image ,phoneNumber }: any) {
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state: any) => state.addItem);

    const handleAddToCart = () => {
        addItem({ id: medicineId, name, price, image, qty: quantity, phoneNumber });
        toast.success(`${quantity} ${name} added to cart!`);
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-2xl w-fit">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-white shadow-sm hover:bg-slate-50"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                    <Minus size={16} />
                </Button>

                <span className="text-lg font-bold w-8 text-center">{quantity}</span>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-white shadow-sm hover:bg-slate-50"
                    onClick={() => setQuantity(prev => prev + 1)}
                >
                    <Plus size={16} />
                </Button>
            </div>

            <Button
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-200"
            >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart — ৳{price * quantity}
            </Button>
        </div>
    );
}