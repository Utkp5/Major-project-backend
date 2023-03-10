import productModel from "../Models/products.js";
import categoryModel from "../Models/category.js";
import orderModel from "../Models/orders.js";
import fs from 'fs';
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();


// create product
export const createProductController = async(req,res) => {

    try {
        
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;

        switch (true) {

            case !name: 
                return res.status(401).send({error : 'Name is rrquired'})
            case !description: 
                return res.status(401).send({error : 'Description is rrquired'})
            case !price: 
                return res.status(401).send({error : 'price is rrquired'})
            case !category: 
                return res.status(401).send({error : 'category is rrquired'})
            case !quantity: 
                return res.status(401).send({error : 'quantity is rrquired'})
            case photo && photo.size > 1000000: 
                return res.status(401).send({error : 'photo is rrquired and should be less then 1mb'})
        }


        const products = new productModel({...req.fields, slug:slugify(name)})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        return res.status(200).send({
            success:true,
            message: `Product created successfully`,
            products,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message : `Error in creating product`
        });
    }

}


//get all product
export const getProductController = async(req,res) => {

    try {
        
        const getproducts = await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message: `all Products`,
            totalProducts: getproducts.length,
            getproducts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message : `Error in getting product`
        });
    }

}


//get single product
export const singleProductController = async(req,res) => {

    try {
        
        const product = await productModel.findOne({slug:req.params.slug}).populate("category").select("-photo") ;
        return res.status(200).send({
            success:true,
            message:'Here is product',
            product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'not find any product'
        });
    }
}


//get photo
export const productPhotoController = async(req,res) => {

    try {
        
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'photo not find'
        });
    }

}


//delete product
export const deleteProductController = async(req,res) => {

    try {
        
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        return res.select(200).send({
            success:true,
            message:'Product deleted successfully'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'not deleted'
        });
    }

}


//update product
export const updateProductController = async(req,res) => {

    try {
        
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;

        switch (true) {

            case !name: 
                return res.status(401).send({error : 'Name is rrquired'})
            case !description: 
                return res.status(401).send({error : 'Description is rrquired'})
            case !price: 
                return res.status(401).send({error : 'price is rrquired'})
            case !category: 
                return res.status(401).send({error : 'category is rrquired'})
            case !quantity: 
                return res.status(401).send({error : 'quantity is rrquired'})
            case photo && photo.size > 1000000: 
                return res.status(401).send({error : 'photo is rrquired and should be less then 1mb'})
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug:slugify(name)},{new:true});
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        return res.status(200).send({
            success:true,
            message: `Product updated successfully`,
            products,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message : `Error in updating product`
        });
    }

}


//product filter
export const productFilterController = async(req,res) => {
    try {
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        return res.status(200).send({
          success: true,
          products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message : `Error in filter product`
        });   
    }
}


// product count
export const productCountController = async (req, res) => {
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };
  

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};


//similar product
export const realtedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const products = await productModel.find({
        category: cid,_id: 
        { $ne: pid },
        })
        .select("-photo")
        .limit(3)
        .populate("category");
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error while geting related product",
        error,
      });
    }
  };


 // get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};


//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.PAYPAL_MERCHANT_ID,
    publicKey: process.env.PAYPAL_PUBLIC_KEY,
    privateKey: process.env.PAYPAL_PRIVATE_KEY,
  });


 //payment gateway api token
export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  


  //payment gateway
  export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;  //api ke ander hi nonce kuch nam hai 
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };