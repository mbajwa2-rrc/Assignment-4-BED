import express, { Router } from "express";
import { getUserProfile, deleteUser } from "../controllers/userRoleController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/** Route to get the user's profile - requires authentication */
router.get("/profile", authenticate, getUserProfile);

/** Route to delete a user - requires authentication and admin role */
router.delete("/:id", authenticate, isAuthorized({hasRole: ["admin"]}), deleteUser);

export default router;