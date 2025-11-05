import express, { Router } from "express";
import {createLoan} from "../controllers/userController";
import authenticate from "../middleware/authenticate";

const router: Router = express.Router();

/** 
 * Route to create a loan application. 
*/
router.post("/loans", authenticate, createLoan);

export default router;