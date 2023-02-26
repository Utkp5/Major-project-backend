import express from 'express';
const router = express.Router();
import { createProductController, 
         getProductController, 
         singleProductController
        } from '../Controllers/productController.js';
import { isAdmin, requireSignIn } from '../Middlewares/authMiddleware.js';
import formidable from 'express-formidable';



//create product
router.post("/Create-product", requireSignIn, isAdmin, formidable(), createProductController);

//get product
router.get("/get-product", getProductController);

//get single product
router.get("/Single-product/:slug", singleProductController);




export default router