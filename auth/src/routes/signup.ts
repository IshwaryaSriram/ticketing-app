import  express, { Request, Response } from "express";
import { ValidationError, body, validationResult } from 'express-validator';

import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseCOnnectionError } from "../errors/database-connection-errors";
import { BadRequestError } from "../errors/bad-request-error";

import { User } from "../models/user";

const router = express.Router();

router.post('/api/users/signup' , [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
], 
async (req: Request,res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        throw new BadRequestError("Email in use");
    }

    const newUser = User.build({ email, password });
    await newUser.save();
    
    res.status(201).send(newUser);


    res.send({}); 


});

export { router as signUpRouter } ;

