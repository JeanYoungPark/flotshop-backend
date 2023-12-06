import express from 'express';
import { User } from '#model/User.js';

export const findUser = express.Router();

findUser.post('/api/find/user', async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ where: data })
    .catch(error => {
        return res.status(200).json({ message: '사용자 조회 중 오류 발생', error: error.message });
    });

    return res.status(200).json({ user });

})

userUpdate.post('/api/user/update', async (req, res) => {
    const data = req.body;
    // 여기서 값 받아서 update해야함,.. view페이지 회원가입페이지 수정 페이지 분리 필요
    const user = new User();
    
    try {
        const result = await user.update();
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(200).json({ message: '사용자 저장 중 오류 발생', error: error.message });
    }

    return res.status(200).json({ user });

})