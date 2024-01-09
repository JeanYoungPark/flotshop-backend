import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from "crypto";
import { Product, ProductImg } from '#model/Product';

const dirname = process.cwd();
export const adminProductRouter = express.Router();

/**
 * 상품 리스트 (카테고리별)
 */
adminProductRouter.post('/product/list', async(req, res) => {
    const data = req.body;
    
    try {
        const productList = await Product.findAll({
            where: { category_id: data.id },
            include: [{model: ProductImg, as: 'productImg', limit: 1, attributes: ['img_path','image_hash']}]
        });
        
        return res.status(200).json({productList});
    } catch (error) {
        return res.status(200).json({ message: '상품 조회 중 오류 발생', error: error.message });
    }
})

/**
 * 상품 추가
 */
adminProductRouter.post('/product/add', async(req, res) => {
    const data = req.body;
    const product = new Product(data);

    try {
        const result = await product.save();
        return res.status(200).json({ result });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: '상품 저장 중 오류 발생', error: err.message });
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(dirname, 'uploads/products');
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const imageHash = crypto.createHash('sha256').update(file.originalname + Date.now()).digest('hex');
        const ext = path.extname(file.originalname);
        const uniqueFilename = `${imageHash}${ext}`;

        cb(null, uniqueFilename)
    },
});
  
const upload = multer({ storage: storage });

/**
 * 상품 이미지 추가
 */
adminProductRouter.post('/product/upload', upload.array('data'), async(req, res) => {
    const categoryId = req.body.categoryId;
    
    const datas = [];
    for (let i = 0; i < req.files.length; i++) {
        const el = req.files[i];
        const data = {};
        data.product_id = categoryId;
        data.img_name = el.originalname;
        data.image_hash = el.filename;
        data.img_path = '/products';
        data.img_size = el.size;
        data.img_format = el.mimetype;

        datas.push(data);
    }
    
    try {
        const result = await ProductImg.bulkCreate(datas);
        res.status(200).json({result});
    } catch (err) {
        return res.status(500).json({ message: '이미지 저장 중 오류 발생', error: err.message });
    }
})
