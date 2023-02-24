import express from "express";
import {registerController, loginController, testController, ForgotpasswordController} from "../Controllers/authController.js";
import {isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";

const router = express.Router();

//we are following MVC pattern...

router.post("/Register", registerController)

router.post("/Login", loginController)

router.get("/Test", requireSignIn, isAdmin, testController);

router.post("/Forgotpassword", ForgotpasswordController)

router.get("/user-auth", requireSignIn, (req,res) => {
    return res.status(200).send({ok : true})
});
router.get("/admin-auth", requireSignIn, isAdmin, (req,res) => {
    return res.status(200).send({ok : true})
});


export default router;