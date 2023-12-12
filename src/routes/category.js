import express from "express";
import { Category, CategoryDetail } from "#model/Category";

export const category = express.Router();
export const categoryDetail = express.Router();

/**
 * 카테고리 대분류
 */
category.post('/api/category', async(req, res) => {
})

/**
 * 카테고리 소분류
 */
categoryDetail.post('/api/category/detail', async(req, res) => {
    const data = req.body;
})