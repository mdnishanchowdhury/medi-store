"use client";

import {
  Check,
  Package,
  Truck,
  Home,
  Clock,
  XCircle,
} from "lucide-react";

type OrderStatus =
  | "PLACED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

const steps: {
  status: Exclude<OrderStatus, "CANCELLED">;
  label: string;
  icon: any;
}[] = [
    { status: "PLACED", label: "Order Placed", icon: Clock },
    { status: "PROCESSING", label: "Processing", icon: Package },
    { status: "SHIPPED", label: "Shipped", icon: Truck },
    { status: "DELIVERED", label: "Delivered", icon: Home },
  ];

export default function OrderTrackingVisual({
  currentStatus,
}: {
  currentStatus: OrderStatus;
}) {
  if (currentStatus === "CANCELLED") {
    return (
      <div className="py-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
          <XCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-red-600">
          Order Cancelled
        </h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          This order has been cancelled and will not be delivered.
        </p>
      </div>
    );
  }

  const currentIndex = steps.findIndex(
    (step) => step.status === currentStatus
  );

  return (
    <div className="py-10">
      <div className="relative flex justify-between">
        <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-10" />

        <div
          className="absolute top-5 left-0 h-1 bg-blue-600 transition-all duration-700 ease-out -z-10"
          style={{
            width: `${Math.max(
              0,
              (currentIndex / (steps.length - 1)) * 100
            )}%`,
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.status}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center border-4 transition-all duration-300
                  ${isCompleted
                    ? "bg-blue-600 border-blue-200 text-white"
                    : isCurrent
                      ? "bg-white border-blue-600 text-blue-600"
                      : "bg-white border-slate-200 text-slate-300"
                  }
                  ${isCurrent ? "ring-4 ring-blue-100 animate-pulse" : ""}
                `}
              >
                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
              </div>

              <p
                className={`mt-3 text-xs font-semibold text-center
                  ${isCompleted || isCurrent
                    ? "text-blue-700"
                    : "text-slate-400"
                  }
                `}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
