import express from 'express'
const router = express.Router();
import { categoryController, createcategoryController, updateController } from "../Controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";


//create category
router.post("/Create-category", requireSignIn, isAdmin, createcategoryController);

//update category 
router.put("/Update-category/:id", requireSignIn, isAdmin, updateController);

//all category
router.get("/get-category", categoryController);

export default router