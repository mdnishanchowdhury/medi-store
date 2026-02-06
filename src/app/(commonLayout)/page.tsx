import MediCards from "@/components/modules/HomePage/MediCards";
import CategorySection from "@/components/modules/HomePage/CategorySection";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";
import { Category, categoryService } from "@/services/category.server";
import HeroMedicine from "@/components/layout/banner";
import SearchBar from "@/components/modules/Store/SearchBar";

export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  let medi: Medicine[] = [];

  try {
    const res = await mediService.getMedicines(
      {
        isFeatured: false,
        search: search || ""
      },
      { cache: "no-store" }
    );

    medi = res?.data?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch medicines:", error);
    medi = [];
  }

  let categories: Category[] = [];
  try {
    const { data } = await categoryService.getCategories({
      cache: "no-store"
    });
    categories = data ?? [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    categories = [];
  }

  return (
    <main className="bg-[#f8fafc] dark:bg-black">

      <div className="pt-24 flex sm:hidden w-full justify-center items-center">
        <div className="w-full max-w-[90%] mx-auto  rounded-lg p-2 bg-white border">
          <SearchBar />
        </div>
      </div>

      <HeroMedicine />
      <div className="container mx-auto px-4 pt-10">
        <h1 className="mb-4 text-xl font-semibold">
          {search ? `Results for "${search}"` : `Total Medicines: ${medi.length}`}
        </h1>

        <CategorySection categories={categories} />

        {medi.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {medi.map((medicine) => (
              <MediCards key={medicine.id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed mt-8">
            <p className="text-muted-foreground italic">
              No medicines found matching "{search}"
            </p>
          </div>
        )}
      </div>
    </main>
  );
}