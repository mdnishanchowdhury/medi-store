const API_URL = process.env.API_URL;
interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export interface Category {
    id: string;
    categoryName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export const categoryService = {
    getCategories: async function (options?: ServiceOptions) {
        try {
            const url = `${API_URL}/category`;

            const config: RequestInit = {
                cache: options?.cache || 'no-store',
                next: {
                    revalidate: options?.revalidate,
                    tags: ['categories'],
                },
            };

            const res = await fetch(url, config);

            if (!res.ok) {
                throw new Error(`API Error: ${res.status} ${res.statusText}`);
            }

            const result = await res.json();

            return {
                data: result.success ? (result.data as Category[]) : [],
                error: null
            };
        } catch (error: any) {
            console.error("Fetch Error:", error);
            return {
                data: null,
                error: {
                    message: error?.message || 'Something went wrong',
                    original: error,
                },
            };
        }
    },
};