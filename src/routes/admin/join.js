import express from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { User } from '#model/User.js';
                                                                                                                                
export const joinRouter = express.Router();

joinRouter.post('/admin/join', async(req, res) => {
    const data = req.body;
    let errors;

    if(data.isAdmin === 'Y'){
        errors = validationResult(data, [
            {
                field: 'user_id',
                rules: [isRequired(), isUnique(), isLength({ min: 4, max: 10 })]
            },
            {
                field: 'password',
                rules: [isRequired(), isLength({ min: 6, max: 15 })]
            },
            {
                field: 'name',
                rules: [isRequired(), isUnique(), isLength({ min: 2, max: 10 })]
            },
            {
                field: 'email',
                rules: [isRequired(), isUnique(), isEmail(), isLength({ max: 50 })]
            },
        ]);
    }

    console.log(errors);

    if(errors) {
        res.status(400);
    }else{
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userInfo = Object.assign({password: hashedPassword}, data);

        const user = new User(userInfo);
    
        const result = await user.save();
        res.status(200).json({ result });
    }
}); 