import express from 'express';
import { User } from '#model/User.js';
import bcrypt from 'bcrypt';

export const findUser = express.Router();
export const updateUser = express.Router();

findUser.post('/api/find/user', async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ where: data })
    .catch(error => {
        return res.status(200).json({ message: '사용자 조회 중 오류 발생', error: error.message });
    });

    return res.status(200).json({ user });
})

updateUser.post('/api/user/update', async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ where: { id: data.id} });
    const isMatch = bcrypt.compare(user.password, data.password);

    if(isMatch){
        try {
            const result = await user.update(data, {where: {id: data.id}});
            return res.status(200).json({ result });
        } catch (error) {
            return res.status(200).json({ message: '사용자 저장 중 오류 발생', error: error.message });
        }
    }
})