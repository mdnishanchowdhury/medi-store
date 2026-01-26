import { NextFunction, Request, Response } from "express"
import { categoryService } from "./category.service";


const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.createCategory(req.body)
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}


const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        res.status(400).json({
            error: "Category creation failed",
            details: error
        })
    }
};

export const categoryController = {
    createCategory,
    getAllCategories
}