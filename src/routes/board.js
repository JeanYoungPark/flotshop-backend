import express from "express";
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { BoardImgTemp } from "#model/Board";

const dirname = process.cwd();
export const boardRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(dirname, 'src/uploads/boards');
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const imageHash = crypto.createHash('md5').update(file.originalname).digest('hex');
        const ext = path.extname(file.originalname);
        const uniqueFilename = `${imageHash}${ext}`;

        cb(null, uniqueFilename)
    },
});
  
const upload = multer({ storage: storage });

/**
 * 게시판 이미지 추가
*/
boardRouter.post('/board/uploadtmp', upload.single('data'), async(req, res) => {
    const el = req.file;
    
    const data = {};
    data.img_name = el.originalname;
    data.image_hash = el.filename;
    data.img_path = '/src/uploads/boards';
    data.img_size = el.size;
    data.img_format = el.mimetype;

    try {
        const result = await BoardImgTemp.create(data);
        res.status(200).json({result});
    } catch (err) {
        return res.status(200).json({ message: '이미지 업로드 중 오류 발생', error: err.message });
    }
})