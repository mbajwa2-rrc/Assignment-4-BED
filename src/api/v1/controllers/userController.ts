import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {loans} from "../types/loan";

/**
 * Controller to create the loan application.
 * Requires authentication middleware to set res.locals.uid
 * @param req - Incoming request object.
 * @param res - Response object to send the loan application response.
 * @param next - Next middleware function.
 */
export const createLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const {name, amount} = req.body;

        const loanApplication = {
            id: Date.now(),
            name,
            amount,
            status: "unreviewed"
        };
        loans.push(loanApplication);
        
        res.status(HTTP_STATUS.CREATED).json({
            message: "Loan application created successfully.",
            data: loanApplication
        });
    } catch (error) {
        next(error);
    }
};