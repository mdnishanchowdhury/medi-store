import { orderService } from "@/services/order.server";
import { Badge } from "@/components/ui/badge";
import OrderTrackingVisual from "@/components/layout/OrderTrackingVisual";

export default async function TrackOrderPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { data: order, error } = await orderService.getOrderById(id);

    if (error || !order) {
        return <div className="p-20 text-center font-bold text-red-500">অর্ডারটি খুঁজে পাওয়া যায়নি!</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 p-8 md:p-12 border border-slate-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">অর্ডার স্ট্যাটাস</h1>
                        <p className="text-slate-500 font-medium">অর্ডার আইডি: <span className="text-blue-600">#{order._id}</span></p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-100 border-none px-6 py-2 rounded-full text-sm font-bold uppercase">
                        {order.status}
                    </Badge>
                </div>

                {/* ট্র্যাকিং প্রগ্রেস বার */}
                <OrderTrackingVisual currentStatus={order.status} />

                <div className="mt-8 space-y-6 bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ডেলিভারি ঠিকানা</p>
                            <p className="text-slate-700 font-semibold">{order.shippingAddress}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">মোট মূল্য</p>
                            <p className="text-2xl font-black text-slate-900">
                                ৳{(order?.items?.[0]?.price || 0) * (order?.items?.[0]?.quantity || 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-10 text-slate-400 text-sm">
                    আপনার অর্ডার সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের ইনকোয়ারি করুন।
                </p>
            </div>
        </div>
    );
}