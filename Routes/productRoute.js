import express from 'express';
const router = express.Router();
import { createProductController, 
         deleteProductController, 
         getProductController, 
         productPhotoController, 
         singleProductController,
         updateProductController
        } from '../Controllers/productController.js';
import { isAdmin, requireSignIn } from '../Middlewares/authMiddleware.js';
import formidable from 'express-formidable';



//create product
router.post("/Create-product", requireSignIn, isAdmin, formidable(), createProductController);

//update product
router.put("/Update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

//get all product
router.get("/Get-product", getProductController);

//get single product
router.get("/Single-product/:slug", singleProductController);

//get photo
router.get("/Product-photo/:pid", productPhotoController);

//delete product
router.delete("/Delete-product/:pid", deleteProductController)

export default router