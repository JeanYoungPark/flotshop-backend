import express from 'express';
import bcrypt from 'bcrypt';
import moment from 'moment-timezone';
import { User } from '#model/User';
import { Session } from '#model/Session';

export const login = express.Router();
export const logout = express.Router();

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
                    const sessionHistory = await Session.findOne({ where: { id: userId } });
                    // const date = moment().locale('ko-kr').format();
                    // const expiredDate = moment().add(1, "day").format();
                    const date = new Date();
                    date.setHours(date.getHours() + 9);

                    const expiredDate = new Date();
                    expiredDate.setHours(expiredDate.getHours() + 9);
                    expiredDate.setDate(expiredDate.getDate() + 1);
                    
                    const userInfo = {
                        userId : user.user_id,
                        isAdmin : user.is_admin,
                        expirationDate: expiredDate
                    }
        
                    const hashedUser = await bcrypt.hash(JSON.stringify(userInfo), 10);
                    
                    if(sessionHistory){
                        // 세션이 있는 경우 업데이트
                        sessionHistory.session_id = hashedUser;
                        sessionHistory.expired_at = expiredDate;
                        sessionHistory.updated_at = date;

                        try {
                            const result = await sessionHistory.save();
                            return res.status(200).json({ result, user: user });
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
                            console.log(result);
                            return res.status(200).json({ result });
                        } catch (error) {
                            return res.status(200).json({ message: '세션 저장 중 오류 발생', error: error.message });
                        }
                    }
                } catch (error) {
                    return res.status(500).json({error: error.message});
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

logout.post('/api/logout', async(req, res) => {
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