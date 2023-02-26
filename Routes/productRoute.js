import express from 'express';
import { createProductController } from '../Controllers/productController.js';
import { isAdmin, requireSignIn } from '../Middlewares/authMiddleware.js';

const router = express.Router();


//create product

router.post("/Create-product", requireSignIn, isAdmin, createProductController);



export default router