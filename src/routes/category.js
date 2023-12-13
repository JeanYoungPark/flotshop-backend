import express from "express";
import pkg, { check } from 'express-validator';
const { validationResult } = pkg;
import { Category, CategoryDetail } from "#model/Category";

export const category = express.Router();
export const categoryDetail = express.Router();
export const categoryAdd = express.Router();
export const categoryDelete = express.Router();
export const categoryDetailAdd = express.Router();
export const categoryDetailDelete= express.Router();

/**
 * 카테고리 대분류
 */
category.post('/api/category', async(req, res) => {
    try {
        const category = await Category.findAll();
        return res.status(200).json({ category });
        
    } catch (error) {
        return res.status(200).json({ message: '카테고리 조회 중 오류 발생', error: err.message });
    }
})

/**
 * 카테고리 소분류
 */
categoryDetail.post('/api/category/:id/detail', async(req, res) => {
    const categoryId = parseInt(req.params.id);
    
    try {
        const categoryDetail = await CategoryDetail.findAll({where: {category_id: categoryId}});
        return res.status(200).json({ categoryDetail });
    } catch (err) {
        return res.status(200).json({ message: '세부 카테고리 조회 중 오류 발생', error: err.message });
    }
})

/**
 * 카테고리 저장
 */
const cateValidationRules = [
    check('title')
        .notEmpty().withMessage('카테고리를 입력해주세요.')
]

categoryAdd.post('/api/category/add', cateValidationRules, async(req, res) => {
    const errors = validationResult(req);
    const data = req.body;
    const category = new Category({title: data.title});

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
        try {
            const result = await category.save();
            return res.status(200).json({ result });
        } catch (err) {
            return res.status(500).json({ message: '카테고리 저장 중 오류 발생', error: err.message });
        }
    }
})

/**
 * 서브 카테고리 저장
 */
const cateDetailValidationRules = [
    check('title')
        .notEmpty().withMessage('서브 카테고리를 입력해주세요.')
]

categoryDetailAdd.post('/api/category/:id/detail/add', cateDetailValidationRules, async(req, res) => {
    const errors = validationResult(req);
    const categoryId = req.params.id;
    const data = req.body;
    const category = new CategoryDetail({category_id: categoryId, title: data.title});
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }else{
        try {
            const result = await category.save();
            return res.status(200).json({ result });
        } catch (err) {
            return res.status(500).json({ message: '서브 카테고리 저장 중 오류 발생', error: err.message });
        }
    }
})

/**
 * 카테고리 삭제
 */
categoryDelete.delete('/api/category/:id', async(req, res) => {
    const categoryId = req.params.id;

    try {
        const res = await Category.findByIdAndDelete(categoryId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: '카테고리 삭제 중 오류 발생', error: err.message });
    }
})


categoryDetailDelete.delete('/api/category/detail/:id/delete', async(req, res) => {
    const categoryId = req.params.id;

    try {
        const res = await CategoryDetail.findByIdAndDelete(categoryId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: '서브 카테고리 삭제 중 오류 발생', error: err.message });
    }
});