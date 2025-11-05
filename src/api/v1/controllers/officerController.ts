import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {loans} from "../types/loan";

/**
 * Controller to get all loan applications.
 */
export const getLoanApplications = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(HTTP_STATUS.OK).json({
            message: "Retrieved all applications successfully.",
            data: loans
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to review a loan application.
 */
export const reviewLoanApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {id} = req.params;

        for (let i = 0; i < loans.length; i++){
            if (loans[i].id === Number(id)){
                loans[i].status = "reviewed";

                res.status(HTTP_STATUS.OK).json({
                    message: "Application reviewed successfully.",
                    data: loans[i]
                });
                return;
            }
        }
    } catch (error: unknown) {
        next(error);
    }
};