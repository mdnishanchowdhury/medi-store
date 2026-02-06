const API_URL = process.env.API_URL;

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetMedicinesParams {
    isFeatured?: boolean;
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
}

export const mediService = {
    getMedicines: async function (
        params?: GetMedicinesParams,
        options?: ServiceOptions
    ) {
        try {
            const url = new URL(`${API_URL}/api/medicines`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache;
            }

            config.next = {
                ...(options?.revalidate ? { revalidate: options.revalidate } : {}),
                tags: ['medicines'],
            };

            const res = await fetch(url.toString(), config);

            if (!res.ok) {
                throw new Error(`API Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();

            return { data, error: null };
        } catch (error: any) {
            return {
                data: null,
                error: {
                    message: error?.message || 'Something went wrong',
                    original: error,
                },
            };
        }
    },


    getMedicinesById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/api/medicines/${id}`);

            const data = await res.json();

            return { data, error: null };
        } catch (error) {
            return { data: null, error: { message: 'Something went wrong' } };
        }
    },

    getCategoryById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/api/medicines?categoryId=${id}`);

            const data = await res.json();

            return { data, error: null };
        } catch (error) {
            return { data: null, error: { message: 'Something went wrong' } };
        }
    },
};
