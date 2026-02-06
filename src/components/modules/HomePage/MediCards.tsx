import React from "react";
import { Medicine } from "@/types/medi.service";
import Link from "next/link";

interface MediCardProps {
  medicine: Medicine;
}

const MediCard: React.FC<MediCardProps> = ({ medicine }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-5 flex flex-col">
      {/* Image */}
      <div className="relative mb-4">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-52 object-cover rounded-xl"
        />
        {!medicine.isActive && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Inactive
          </span>
        )}
      </div>

      {/* Name & Category */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {medicine.name}
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
          {medicine.category.categoryName}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
        {medicine.description}
      </p>

      {/* Price & Stock */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-green-600 dark:text-green-400">
          ${medicine.price}
        </span>
        <span
          className={`text-sm font-medium ${medicine.stock > 0 ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"
            }`}
        >
          {medicine.stock > 0 ? `${medicine.stock} in stock` : "Out of stock"}
        </span>
      </div>

      {/* Manufacturer */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Manufacturer: {medicine.manufacturer}
      </div>

      {/* Action Button */}
      <Link href={`/medicine/${medicine.id}`}>
        <button
          disabled={!medicine.isActive || medicine.stock <= 0}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${medicine.isActive && medicine.stock > 0
              ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {medicine.isActive && medicine.stock > 0 ? "Buy Now" : "Unavailable"}
        </button>
      </Link>
    </div>
  );
};

export default MediCard;
