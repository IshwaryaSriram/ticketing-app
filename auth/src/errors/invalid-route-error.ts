import { CustomError } from "./model/custom-error";

export class InvalidRouteError extends CustomError { 
    statusCode = 404;

    constructor() { 
        super("Route not found");
        Object.setPrototypeOf(this, InvalidRouteError.prototype);
    }

    serializeErrors() { 
        return [{ message: 'Not Found'}];
    }
}