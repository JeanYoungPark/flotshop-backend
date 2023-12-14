import express from 'express';
import { Product } from '#model/Product';

export const adminProductList = express.Router();
export const adminProductAdd = express.Router();
export const adminProductImgUpload = express.Router();

/**
 * 상품 리스트 (카테고리별)
 */
adminProductList.post('/api/admin/product/list', async(req, res) => {
    const data = req.body;
    console.log(data);
    // const productList = await Product.findALL({where: {category: data}})
    // .catch(error => {
    //     return res.status(200).json({ message: '상품 조회 중 오류 발생', error: error.message });
    // });

    // return res.status(200).json({productList});
})

/**
 * 상품 추가
 */
adminProductAdd.post('/api/admin/product/add', async(req, res) => {
    const data = req.body;
})

/**
 * 상품 이미지 추가
 */
adminProductImgUpload.post('/api/admin/product/upload', (req, res) => {
    const files = req.files;
    console.log(files);
})
