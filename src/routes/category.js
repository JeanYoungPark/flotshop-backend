import express from "express";
import pkg, { check } from 'express-validator';
const { validationResult } = pkg;
import { Category, CategoryDetail } from "#model/Category";

export const categoryRouter = express.Router();
/**
 * 카테고리 리스트
*/
categoryRouter.post('/category', async(req, res) => {
    try {
        const category = await Category.findAll();
        return res.status(200).json({ category });
        
    } catch (error) {
        return res.status(200).json({ message: '카테고리 조회 중 오류 발생', error: err.message });
    }
})

/**
 * 카테고리 저장
*/
const cateValidationRules = [
    check('title')
    .notEmpty().withMessage('카테고리를 입력해주세요.')
]

categoryRouter.post('/category/add', cateValidationRules, async(req, res) => {
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
 * 카테고리 삭제
 */
categoryRouter.delete('/category/:id', async(req, res) => {
    const categoryId = req.params.id;
    
    try {
        const category = await Category.destroy({where : {id: categoryId}});
        return res.status(200).json({ success: category });
    } catch (err) {
        return res.status(500).json({ message: '카테고리 삭제 중 오류 발생', error: err.message });
    }
})

/**
 * 카테고리 정보
 */
categoryRouter.post('/category/info/:id', async(req, res) => {
    const categoryId = req.params.id;
    
    try {
        const category = await Category.findOne({where : {id: categoryId}});
        
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: '카테고리 조회 중 오류 발생', error: err.message });
    }
})

/**
 * 서브 카테고리 리스트
 */
categoryRouter.post('/category/:id/detail', async(req, res) => {
    const categoryId = parseInt(req.params.id);
    
    try {
        const categoryDetail = await CategoryDetail.findAll({where: {category_id: categoryId}});
        return res.status(200).json({ categoryDetail });
    } catch (err) {
        return res.status(200).json({ message: '세부 카테고리 조회 중 오류 발생', error: err.message });
    }
})

/**
 * 서브 카테고리 저장
 */
const cateDetailValidationRules = [
    check('title')
        .notEmpty().withMessage('서브 카테고리를 입력해주세요.')
]

categoryRouter.post('/category/:id/detail/add', cateDetailValidationRules, async(req, res) => {
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
 * 서브 카테고리 삭제
 */
categoryRouter.delete('/category/detail/:id', async(req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await CategoryDetail.destroy({where: {id: categoryId}});
        return res.status(200).json({ success: category });
    } catch (err) {
        return res.status(500).json({ message: '서브 카테고리 삭제 중 오류 발생', error: err.message });
    }
});