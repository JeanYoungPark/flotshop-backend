import express from 'express';
import { Session } from '#model/Session';

export const commonAuthRouter = express.Router();

commonAuthRouter.post('/logout', async(req, res) => {
    const data = req.body;
    
    const date = new Date();
    date.setHours(date.getHours() + 9);

    try {
        const newSession = await Session.update({expired_at: date, updated_at: date}, {where: { id: data.id }});
        return res.status(200).json({success: newSession});
    } catch (error) {
        return res.status(200).json({ message: '세션 변경 중 오류 발생', error: error.message });
    }
})