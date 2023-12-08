import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '#model/User';
import { Session } from '#model/Session';

export const login = express.Router();


login.post('/api/login', async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ where: { user_id: data.user_id} });

    if(user.id){
        const isMatch = bcrypt.compare(user.password, data.password);
        
        if(isMatch){
            const hash = crypto.createHash("sha256");
            hash.update(user.user_id, user.name, user.email, user.isAdmin);
            const hashedData = hash.digest("hex");
            
            const data = {
                id: user.id,
                session_id: hashedData,
                create_at: ,
                updated_at: ,
                expired_at
            }
            // const session = new Session(data);
            // 세션 테이블에 저장
        }
    }
})