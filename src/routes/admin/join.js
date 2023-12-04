import express from 'express';
import bcrypt from 'bcrypt';
import validate from 'express-validator';
import { Users } from '#model/Users.js';
                                                                                                                                
export const joinRouter = express.Router();

joinRouter.post('/admin/join', async(req, res) => {
    const data = req.body;
    const err = validate(data, {
        user_id: {
            required: true,
        },
    });

    if(err.length > 0) {
        res.status(400);
    }else{
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const user = new Users({
            user_id: data.id,
            password: hashedPassword,
            name: data.name,
            email: data.email,
            zipcode: "0",
            address_2: "aa",
            phone_2: "01011111111",
            agree_term: 'Y',
            agree_email: 'Y'
        });
    
        const result = await user.save();
        res.status(200).json({ result });
    }
    
}); 