
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";
import {
    MessageSquare,
    Building2,
    Pill,
    Send,
    Star,
    CheckCircle2
} from "lucide-react";
import OrderButtons from "../OrderButtons";
import { userService } from "@/services/user.service";

export async function generateStaticParams() {
    const { data } = await mediService.getMedicines();
    return data?.data?.map((medi: Medicine) => ({ id: medi.id })).splice(0, 3);
}

export default async function MedicinePage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const { data: medicine } = await mediService.getMedicinesById(id);
    const medi: Medicine = medicine.data;
    const { data: session, } = await userService.getSession();
    const sellerId = session.user.id;

    return (
        <div className="w-full max-auto bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row w-full max-auto">

                    <div className="bg-[#F1F5F9] p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>

                        <div className="relative z-10 w-full aspect-square bg-white rounded-[2.5rem] shadow-xl border border-white flex items-center justify-center p-10 group">
                            <img
                                src={medi.image}
                                alt={medi.name}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    <div className="p-8 md:p-14 flex flex-col gap-8 flex-1">

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {medi.category.categoryName}
                                </Badge>
                                <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-100 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    In Stock
                                </Badge>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                                {medi.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-5 text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Building2 size={18} className="text-blue-500" />
                                    <span className="text-sm font-semibold">{medi.manufacturer}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Pill size={18} className="text-blue-500" />
                                    <span className="text-sm font-semibold">Authentic Product</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-slate-900 font-bold text-lg uppercase tracking-widest text-[11px]">Description</h3>
                            <p className="text-slate-500 leading-relaxed text-[15px]">
                                {medi.description || "High-quality pharmaceutical product tested for safety and efficacy. Consult with a specialist before use."}
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 flex items-center justify-between border border-slate-100 rounded-2xl shadow-sm">
                            <div>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Market Price</p>
                                <div className="flex items-baseline gap-1">
                                    <h1 className="text-4xl text-slate-900 font-bold">৳{medi.price}</h1>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-slate-200"></div>
                            <div className="text-right">
                                <p className="text-slate-900 font-bold text-lg">{medi.stock} Units</p>
                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">Available in Store</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">

                            <OrderButtons
                                medicineId={medi.id}
                                name={medi.name}     
                                price={medi.price}
                                image={medi.image}  
                                sellerId={sellerId}
                            />

                            <Button variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 bg-slate-900 text-black font-bold text-md hover:bg-black transition-all">
                                <MessageSquare className="mr-2 h-5 w-5" /> Inquire Now
                            </Button>
                        </div>



                    </div>

                </div>
                <div className="pt-10 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <h3 className="text-lg font-bold text-slate-900">Customer Reviews</h3>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
                            <span className="ml-2 text-sm font-bold text-slate-700">4.9</span>
                        </div>
                    </div>

                    <div className="space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">JD</div>
                                        <span className="text-sm font-bold text-slate-800">John Doe</span>
                                        <CheckCircle2 size={12} className="text-emerald-500" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium">Jan 24, 2024</span>
                                </div>
                                <p className="text-sm text-slate-600 italic">"Excellent quality and fast delivery. Highly recommended!"</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <div className="relative group">
                            <textarea
                                placeholder="Share your experience with this medicine..."
                                rows={2}
                                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none text-sm"
                            />
                        </div>
                        <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-black text-black font-bold shadow-md transition-all active:scale-[0.98]">
                            Post Comment <Send size={16} className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}