import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '#model/User';
import { Session } from '#model/Session';
import moment from 'moment';

export const login = express.Router();


login.post('/api/login', async(req, res) => {
    const data = req.body;
    try {
        const user = await User.findOne({ where: { user_id: data.user_id } });
        
        if(user.id){
            // 비밀번호 맞는지 확인
            const isMatch = await bcrypt.compare(data.password, user.password);
            
            if(isMatch){
                try {
                    const userId = parseInt(user.id);
                    // 기존에 세션 테이블에 존재하는지 확인
                    const sessionHistory = await Session.findOne({where: { id: userId}});
                    console.log(sessionHistory)
                    console.log(11121)
                    const date = new Date();
                    const expiredDate = moment(date).add(1, "day").toDate();
        
                    const userInfo = {
                        userId : user.user_id,
                        isAdmin : user.is_admin,
                        expirationDate: expiredDate
                    }
        
                    const hashedUser = bcrypt.hash(userInfo, 10);
        
                    if(sessionHistory){
        
                        // 세션이 있는 경우 업데이트
                        const data = {
                            session_id: hashedUser,
                            expired_at: expiredDate
                        }
        
                        sessionHistory.set(data);
                        
                        try {
                            const result = await user.update();
                            console.log(result)
                            return res.status(200).json({ result });
                        } catch (error) {
                            return res.status(200).json({ message: '세션 저장 중 오류 발생', error: error.message });
                        }
                    }else{
                        const data = {
                            id: user.id,
                            session_id: hashedUser,
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
                } catch (error) {
                    return res.status(500);
                }
    
            }else{
                return res.status(200).json({message: '비밀번호를 다시 입력해주세요.'})
            }
                
        }else{
            return res.status(200).json({message: '아이디를 다시 입력해주세요.'})
        }
    } catch (error) {
        return res.status(500);
    }

})