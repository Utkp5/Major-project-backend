import slugify from "slugify";
import categoryModel from "../Models/category.js";


// create category
export const createcategoryController = async(req,res) => {

    try {
        
        const {name} = req.body
        if (!name) {
            return res.status(400).send({message : `Name is required`});
        }
        const existingCategory = await categoryModel.findOne({name});
        if (existingCategory) {
            return res.status(401).send({
                success:false,
                message:`Category already exists`
            });
        }

        const category = await new categoryModel({name, slug:slugify(name)}).save();
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
        
        const {name} = req.body;
        const {id} = req.params;
        const Category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        return res.status(200).send({
            success:true,
            message: 'Updated successfully',
            Category
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'error while update'
        });
    }

}


//get all category

export const categoryController = async(req,res) => {
    
    try {
        
        const Category = await categoryModel.find({})
        return res.status(200).send({
            success:true,
            message:'Here  are all categories',
            Category
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'not find any category'
        });
    }

}

//single category

export const singleCategoryController = async(req,res) => {

    try {
        
        const Category = await categoryModel.find({slug:req.params.slug});
        return res.status(200).send({
            success:true,
            message:'Here is category',
            Category
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'not find any category'
        });
    }
}

//delete category

export const deleteCategoryController = async(req,res) => {

    try {
        
        const {id} = req.params;
        await categoryModel.findByIdAndDelete({id});
        return res.status(200).send({
            success:true,
            message:'category deleted successfully',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'not deleted'
        });
    }

}