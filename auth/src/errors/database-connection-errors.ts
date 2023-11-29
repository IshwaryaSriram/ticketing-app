import { CustomError } from "./model/custom-error";

export class DatabaseCOnnectionError extends CustomError { 
    reason = 'Error connecting to Database';
    statusCode = 500; 

    constructor () { 
        super("Error connectig to DB");

        Object.setPrototypeOf(this, DatabaseCOnnectionError.prototype);
    }

    serializeErrors() {
        return [ { message: this.reason }];
    }
}