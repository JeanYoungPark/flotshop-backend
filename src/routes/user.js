import express from 'express';
import { User } from '#model/User';
import bcrypt from 'bcrypt';

export const findUser = express.Router();
export const updateUser = express.Router();
export const deleteUser = express.Router();

findUser.post('/api/find/user', async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ where: data });
        return res.status(200).json({ result: true, user });
    } catch (error) {
        return res.status(500).json({ message: '사용자 조회 중 오류 발생', error: error.message });
    }
})

updateUser.post('/api/user/update', async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ where: { id: data.id} });
    const isMatch = bcrypt.compare(user.password, data.password);

    if(isMatch){
        try {
            const result = await user.update(data, {where: {id: data.id}});
            return res.status(200).json({ result: true, result });
        } catch (error) {
            return res.status(500).json({ message: '사용자 저장 중 오류 발생', error: error.message });
        }
    }
})

deleteUser.delete('/api/user/delete', async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ where: { id: data.id} });
    
    try {
        const result = await user.update({use_yn: 'N'}, {where: {id: data.id}});
        return res.status(200).json({ result: true, result });
    } catch (error) {
        return res.status(500).json({ message: '사용자 삭제 중 오류 발생', error: error.message })
    }
})