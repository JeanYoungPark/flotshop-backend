import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '#model/User';
import { Session } from '#model/Session';

export const login = express.Router();


login.post('/api/login', async(req, res) => {
    const data = req.body;
    const user = await User.findOne({ where: { user_id: data.user_id } });

    if(user.id){
        // 비밀번호 맞는지 확인
        const isMatch = bcrypt.compare(user.password, data.password);
        
        if(isMatch){
            // 기존에 세션 테이블에 존재하는지 확인
            const sessionHistory = new Session.findOne({where: { id: user.id}});

            const date = new Date();
            const expiredDate = date.add(1, "day");
            
            // 세션 정보 추가
            req.session.userId = user.user_id;
            req.session.admin = user.is_admin;
            req.session.expirationDate = expiredDate;

            if(sessionHistory){
                // 세션이 있는 경우 업데이트
                const data = {
                    session_id: req.session,
                    expired_at: expiredDate
                }

                sessionHistory.set(data);
                
                try {
                    const result = await user.update();
                    return res.status(200).json({ result });
                } catch (error) {
                    return res.status(200).json({ message: '세션 저장 중 오류 발생', error: error.message });
                }
            }else{
                const data = {
                    id: user.id,
                    session_id: req.session,
                    create_at: date,
                    expired_at: expiredDate
                }
                
                const session = new Session(data);
                
                try {
                    const result = await session.save();
                    return res.status(200).json({ result });
                } catch (error) {
                    return res.status(200).json({ message: '세션 저장 중 오류 발생', error: error.message });
                }
            }
        }
            
    }
})