export interface Category {
    id: string;
    categoryName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    manufacturer: string;
    isActive: boolean;
    categoryId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    category: Category;
    reviews: any[];
}

export interface GetMedicinesResponse {
    success: boolean;
    data: Medicine[];
}
