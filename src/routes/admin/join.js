import express from 'express';
import bcrypt from 'bcrypt';
import pkg, { check } from 'express-validator';
const { validationResult } = pkg;
import { User } from '#model/User';
                                                                                                                                
export const adminJoin = express.Router();

const userValidationRules = [
    check('user_id')
        .notEmpty().withMessage('아이디를 입력해주세요.')
        .isLength({ min: 4, max: 10 }).withMessage('아이디는 4~10자 사이로 입력해주세요.'),
    check('password')
        .notEmpty().withMessage('비밀번호를 입력해주세요.')
        .isLength({ min: 6, max: 15 }).withMessage('비밀번호는 6~15자 사이로 입력해주세요.'),
    check('name')
        .notEmpty().withMessage('이름을 입력해주세요.')
        .isLength({ min: 2, max: 10 }).withMessage('비밀번호는 2~10자 사이로 입력해주세요.'),
    check('email')
        .notEmpty().withMessage('이메일을 입력해주세요.')
        .isEmail().withMessage('올바른 이메일 형식을 입력해주세요.')
]

adminJoin.post('/api/admin/user/join', userValidationRules, async(req, res) => {
    const data = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userInfo = Object.assign(data, {password: hashedPassword, is_admin: 'Y'});
        const user = new User(userInfo);
    
        try {
            const result = await user.save()
            return res.status(200).json({ result });
        } catch (error) {
            return res.status(200).json({ message: '사용자 저장 중 오류 발생', error: error.message });
        }

    }
}); 