import  express, { Request, Response } from "express";
import { ValidationError, body, validationResult } from 'express-validator';

import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseCOnnectionError } from "../errors/database-connection-errors";

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

    // console.log(errors);
    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    console.log("Creating a user");

    // throw new DatabaseCOnnectionError();
    res.send({}); 


});

export { router as signUpRouter } ;

