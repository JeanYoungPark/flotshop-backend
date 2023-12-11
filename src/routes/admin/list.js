import express from 'express';
import { User } from '#model/User';
                                                                                                                                
export const adminListRouter = express.Router();

adminListRouter.post('/api/admin/user/list', async(req, res) => {
    const users = await User.findAll({where: { is_admin: 'Y' }})
    .catch(error => {
        return res.status(200).json({ message: '사용자 조회 중 오류 발생', error: error.message });
    });

    return res.status(200).json({ users });
})