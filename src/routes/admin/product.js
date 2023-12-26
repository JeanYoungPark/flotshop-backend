import express from 'express';
import multer from 'multer';
import path from 'path';
import { Product, ProductImg } from '#model/Product';

const dirname = process.cwd();
export const adminProductRouter = express.Router();

/**
 * 상품 리스트 (카테고리별)
 */
adminProductRouter.post('/product/list', async(req, res) => {
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
adminProductRouter.post('/product/add', async(req, res) => {
    const data = req.body;
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(dirname, 'src/uploads/products');
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
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
        data.product_id = 5;
        data.img_name = el.filename;
        data.img_data = el.encoding;
        data.img_size = el.size;
        data.img_format = el.mimetype;

        datas.push(data);
    }
    
    try {
        const productImg = new ProductImg(datas);
        const result = await productImg.save();
        res.status(200).json({result});
    } catch (err) {
        return res.status(500).json({ message: '이미지 저장 중 오류 발생', error: err.message });
    }
})
