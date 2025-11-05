import express, { Router } from "express";
import {setCustomClaims, getUserDetails} from "../controllers/adminRoleController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/** Route to set custom claims for users - requires authentication and admin role */
router.post("/claims", authenticate, isAuthorized({hasRole: ["admin"]}), setCustomClaims);

/** Route to get a user's details - requires authentication and admin role */
router.get("/:id", authenticate, isAuthorized({hasRole: ["admin"]}), getUserDetails);

export default router;