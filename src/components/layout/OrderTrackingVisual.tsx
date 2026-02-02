"use client";
import { Clock, Truck, CheckCircle2 } from "lucide-react";

const steps = [
  { label: "Pending", icon: Clock },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: CheckCircle2 },
];

export default function OrderTrackingVisual({ currentStatus }: { currentStatus: string }) {
  // স্ট্যাটাস ইনডেক্স বের করা (যেমন: Shipped হলে ইনডেক্স হবে ১)
  const currentIndex = steps.findIndex(s => s.label.toLowerCase() === currentStatus?.toLowerCase());

  return (
    <div className="flex items-center justify-between w-full py-12">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index <= currentIndex;
        
        return (
          <div key={step.label} className="relative flex flex-col items-center flex-1">
            {/* কানেক্টিং লাইন */}
            {index !== 0 && (
              <div className={`absolute top-5 right-1/2 w-full h-1 -z-10 ${isActive ? "bg-blue-600" : "bg-slate-100"}`} />
            )}
            
            {/* বৃত্তাকার আইকন */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 
              ${isActive ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white border-slate-200 text-slate-300"}`}>
              <Icon size={18} />
            </div>
            
            <span className={`mt-3 text-xs font-bold uppercase tracking-wider ${isActive ? "text-blue-600" : "text-slate-400"}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}