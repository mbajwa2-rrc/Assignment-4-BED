import express, { Router } from "express";
import {getLoanApplications, approveLoanApplication} from "../controllers/managerController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/** 
 * Route to get all loan applications. 
*/
router.get("/loans", authenticate, isAuthorized({hasRole: ["manager"]}), getLoanApplications);

/** 
 * Route to approve a loan application. 
*/
router.put("/loans/:id", authenticate, isAuthorized({hasRole: ["manager"]}), approveLoanApplication);

export default router;