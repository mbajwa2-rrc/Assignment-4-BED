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
 * Controller to approve a loan application.
 */
export const approveLoanApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {id} = req.params;

        for (let i = 0; i < loans.length; i++){
            if (loans[i].id === Number(id)){
                loans[i].status = "approved";

                res.status(HTTP_STATUS.OK).json({
                    message: "Application approved successfully.",
                    data: loans[i]
                });
                return;
            }
        }
    } catch (error: unknown) {
        next(error);
    }
};