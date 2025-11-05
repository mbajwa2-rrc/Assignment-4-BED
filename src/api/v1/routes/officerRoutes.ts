import express, { Router } from "express";
import {getLoanApplications, reviewLoanApplication} from "../controllers/officerController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/** 
 * Route to get all loan applications. 
*/
router.get("/loans", authenticate, isAuthorized({hasRole: ["officer"]}), getLoanApplications);

/** 
 * Route to review a loan application. 
*/
router.put("/loans/:id", authenticate, isAuthorized({hasRole: ["officer"]}), reviewLoanApplication);

export default router;