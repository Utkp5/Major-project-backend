import slugify from "slugify";
import Category from "../Models/category.js";


// create category
export const categoryController = async(req,res) => {

    try {
        
        const {name} = req.body
        if (!name) {
            return res.status(400).send({message : `Name is required`});
        }
        const existingCategory = await Category.findOne({name});
        if (existingCategory) {
            return res.status(401).send({
                success:false,
                message:`Category already exists`
            });
        }

        const category = await new Category({name, slug:slugify(name)}).save();
        return res.status(200).send({
            success:true,
            message: `New category created`,
            category
        })


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message : `Error in Category`
        })
    }

}

//update category
export const updateController = async(req,res) => {

    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'error while update'
        });
    }

}