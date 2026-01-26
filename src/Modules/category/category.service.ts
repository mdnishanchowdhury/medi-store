import { prisma } from "../../lib/prisma";

// create Category
const createCategory = async (data: {
    categoryName: string;
    description: string;
}) => {
    const result = await prisma.category.create({
        data: {
            ...data,
        }
    })
    return result;
}

// get All Categories
const getAllCategories = async () => {
    return prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};


export const categoryService = {
    createCategory,
    getAllCategories
}