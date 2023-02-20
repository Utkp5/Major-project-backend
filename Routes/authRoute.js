import express from "express";
import {registerController, loginController, testController} from "../Controllers/authController.js";
import {isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";

const router = express.Router();

//we are following MVC pattern...

router.post("/Register", registerController)

router.post("/Login", loginController)

router.get("/Test", requireSignIn, isAdmin, testController);

export default router;