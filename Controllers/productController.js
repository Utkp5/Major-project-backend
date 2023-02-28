import productModel from "../Models/products.js";
import fs from 'fs';
import slugify from "slugify";

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
            case !photo && photo.size > 1000000: 
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

//get product

export const getProductController = async(req,res) => {

    try {
        
        const products = await productModel.findOne({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message: `all Products`,
            totalProducts: products.length,
            products
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
        
        const product = await categoryModel.find({slug:req.params.slug}).populate("category").select("-photo") ;
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
        
        const product = productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
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
            case !photo && photo.size > 1000000: 
                return res.status(401).send({error : 'photo is rrquired and should be less then 1mb'})
        }

        const products = new productModel.findByIdAndUpdate({...req.fields, slug:slugify(name)},{new:true});
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