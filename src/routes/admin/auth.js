import express from 'express';
import bcrypt from 'bcrypt';
import pkg, { check } from 'express-validator';
const { validationResult } = pkg;
import { User } from '#model/User';
import { Session } from '#model/Session';
                                                                                                                                
export const adminAuthRouter = express.Router();

adminAuthRouter.post('/login', async(req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ where: { user_id: data.user_id, is_admin: 'Y' } });
        
        if(user.id){
            // 비밀번호 맞는지 확인
            const isMatch = await bcrypt.compare(data.password, user.password);
            
            if(isMatch){
                try {
                    const userId = parseInt(user.id);
                    
                    // 기존에 세션 테이블에 존재하는지 확인
                    const sessionHistory = await Session.findOne({ where: { id: userId } });
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
                            return res.status(200).json({ restult: true, result, user: user });
                        } catch (error) {
                            return res.status(200).json({ restult: false, message: '세션 저장 중 오류 발생', error: error.message });
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
                            return res.status(200).json({ restult: true, result });
                        } catch (error) {
                            return res.status(200).json({ restult: false, message: '세션 저장 중 오류 발생', error: error.message });
                        }
                    }
                } catch (error) {
                    return res.status(500).json({restult: false, error: error.message});
                }
    
            }else{
                return res.status(200).json({restult: false, message: '비밀번호를 다시 입력해주세요.'})
            }
                
        }else{
            return res.status(200).json({restult: false, message: '아이디를 다시 입력해주세요.'})
        }
    } catch (error) {
        return res.status(500);
    }

})

const userValidationRules = [
    check('user_id')
        .notEmpty().withMessage('아이디를 입력해주세요.')
        .isLength({ min: 4, max: 10 }).withMessage('아이디는 4~10자 사이로 입력해주세요.'),
    check('password')
        .notEmpty().withMessage('비밀번호를 입력해주세요.')
        .isLength({ min: 6, max: 15 }).withMessage('비밀번호는 6~15자 사이로 입력해주세요.'),
    check('name')
        .notEmpty().withMessage('이름을 입력해주세요.')
        .isLength({ min: 2, max: 10 }).withMessage('비밀번호는 2~10자 사이로 입력해주세요.'),
    check('email')
        .notEmpty().withMessage('이메일을 입력해주세요.')
        .isEmail().withMessage('올바른 이메일 형식을 입력해주세요.')
]

adminAuthRouter.post('/user/join', userValidationRules, async(req, res) => {
    const data = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userInfo = Object.assign(data, {password: hashedPassword, is_admin: 'Y'});
        const user = new User(userInfo);
    
        try {
            const result = await user.save()
            return res.status(200).json({ result });
        } catch (error) {
            return res.status(200).json({ message: '사용자 저장 중 오류 발생', error: error.message });
        }

    }
}); 