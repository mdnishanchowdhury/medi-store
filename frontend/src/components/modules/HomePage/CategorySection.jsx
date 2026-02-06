import Link from 'next/link';
import { ArrowRight } from "lucide-react";

const CategorySection = ({ categories }) => {
    return (
        <div className="max-w-7xl mx-auto py-6">

            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <p className="text-blue-600 font-bold text-[13px]">Our Specializations</p>
                    <h2 className="text-xl font-medium text-slate-700">
                        Browse by <span className="text-blue-500">Category</span>
                    </h2>
                </div>

                <Link href={`/medicines`} className="flex items-center gap-2 px-6 py-1.5 border border-slate-300 rounded-full text-sm font-bold text-slate-800 hover:bg-slate-50 transition-all">
                    Explore All <ArrowRight size={16} />
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {categories.map((cat) => (
                    <Link href={`/store/${cat.id}`} key={cat.id} className="block w-full">
                        <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-semibold text-slate-800 dark:text-gray-400">
                                    {cat.categoryName}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default CategorySection;