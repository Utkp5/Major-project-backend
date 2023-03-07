import express from 'express';
const router = express.Router();
import { createProductController, 
         deleteProductController, 
         getProductController, 
         productCategoryController, 
         productCountController, 
         productFilterController, 
         productListController, 
         productPhotoController, 
         realtedProductController, 
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

//product filter
router.post("/Product-filter", productFilterController)

//product count
router.get("/Product-count", productCountController)

//product list
router.get("/Product-list/:page", productListController)

//similar products
router.get("/Related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router