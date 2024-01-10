import express from "express";
import pkg, { check } from 'express-validator';
const { validationResult } = pkg;
import { Option, OptionDetail } from "#model/Option";

export const optionRouter = express.Router();

/**
 * 옵션 리스트
*/
optionRouter.post('/option', async(req, res) => {
    try {
        const option = await Option.findAll();
        return res.status(200).json({ option });
        
    } catch (error) {
        return res.status(200).json({ message: '옵션 조회 중 오류 발생', error: err.message });
    }
})

/**
 * 옵션 저장
*/
const optionValidationRules = [
    check('title')
    .notEmpty().withMessage('옵션을 입력해주세요.')
]

optionRouter.post('/option/add', optionValidationRules, async(req, res) => {
    const errors = validationResult(req);
    const data = req.body;
    const option = new Option({title: data.title});
    
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
        try {
            const result = await option.save();
            return res.status(200).json({ result });
        } catch (err) {
            return res.status(500).json({ message: '옵션 저장 중 오류 발생', error: err.message });
        }
    }
})

/**
 * 옵션 삭제
 */
optionRouter.delete('/option/:id', async(req, res) => {
    const optionId = req.params.id;
    
    try {
        const option = await Option.destroy({where : {id: optionId}});
        return res.status(200).json({ success: option });
    } catch (err) {
        return res.status(500).json({ message: '옵션 삭제 중 오류 발생', error: err.message });
    }
})

/**
 * 서브 옵션 리스트
 */
optionRouter.post('/option/:id/detail', async(req, res) => {
    const optionId = parseInt(req.params.id);
    
    try {
        const optionDetail = await OptionDetail.findAll({where: {option_id: optionId}});
        
        return res.status(200).json({ optionDetail });
    } catch (err) {
        return res.status(200).json({ message: '세부 옵션 조회 중 오류 발생', error: err.message });
    }
})

/**
 * 서브 옵션 저장
 */
const optionDetailValidationRules = [
    check('title')
        .notEmpty().withMessage('서브 옵션을 입력해주세요.')
]

optionRouter.post('/option/:id/detail/add', optionDetailValidationRules, async(req, res) => {
    const errors = validationResult(req);
    const optionId = req.params.id;
    const data = req.body;
    const option = new OptionDetail({option_id: optionId, title: data.title});
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }else{
        try {
            const result = await option.save();
            return res.status(200).json({ result });
        } catch (err) {
            return res.status(500).json({ message: '서브 옵션 저장 중 오류 발생', error: err.message });
        }
    }
})