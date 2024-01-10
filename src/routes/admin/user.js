import express from 'express';
import { User } from '#model/User';
                                                                                                                                
export const adminUserRouter = express.Router();

adminUserRouter.post('/user/list', async(req, res) => {
    try {
        const users = await User.findAll({where: { is_admin: 'Y' }})
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(200).json({ message: '사용자 조회 중 오류 발생', error: error.message });
    }
})