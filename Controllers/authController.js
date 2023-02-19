import userModel from "../Models/user.js";
import { comparePassword, hashPassword } from "../Helpers/authHelper.js";

export const registerController = async (req,res) => {

    try {

        const {firstName, lastName, Email, password, phone, address} = req.body;

        //validations
        if (!firstName) {
          return res.send({ error: "firstName is Required" });
        }
        if (!lastName) {
          return res.send({ error: "lastName is Required" });
        }
        if (!Email) {
          return res.send({ error: "Email is Required" });
        }
        if (!password) {
          return res.send({ error: "Password is Required" });
        }
        if (!phone) {
          return res.send({ error: "Phone no is Required" });
        }
        if (!address) {
          return res.send({ error: "Address is Required" });
        }
    
        //check user
        const exisitingUser = await userModel.findOne({ Email });

        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
              success: true,
              message: "Already Register please login",
            });
          }

        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
          firstName,
          lastName,
          Email,
          phone,
          address,
          password: hashedPassword,
        }).save();
    
        res.status(201).send({
          success: true,
          message: "User Register Successfully",
          user,
        });


    } catch (error) {
        
        console.log(error);
        return res.status(500).send({
            success: false,
            message : 'Error in Registration',
            error,
        });
    }

};