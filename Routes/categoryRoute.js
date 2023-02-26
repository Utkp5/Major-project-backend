import express from 'express'
const router = express.Router();
import { categoryController, updateController } from "../Controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";


//create category
router.post("/Create-category", requireSignIn, isAdmin, categoryController);

//update category 
router.put("/Update-category", requireSignIn, isAdmin, updateController);


export default router