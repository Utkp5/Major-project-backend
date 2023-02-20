import userModel from "../Models/user.js";
import { comparePassword, hashPassword } from "../Helpers/authHelper.js";
import emailValidator from "email-validator";
import  Jwt  from "jsonwebtoken";

//Registration logic
export const registerController = async (req,res) => {

    try {

        const {firstName, lastName, Email, password, phone, address} = req.body;

        //validations
        if (!firstName) {
          return res.status(400).send({ error: "firstName is Required" });
        }
        if (!lastName) {
          return res.status(400).send({ error: "lastName is Required" });
        }
        if (firstName === lastName) {
          return res.status(400).send('firstname and lastname should not same')
        }
        if (!emailValidator.validate(Email)) {
          return res.status(400).send({ error: "Email is not correct" });
        }
        if (!Email) {
          return res.status(400).send({ error : 'Email is required'})
        }
        if (!password) {
          return res.status(400).send({ error: "Password is Required" });
        }
        if (password.length < 8) {
          return res.status(400).send('Password should have min 8 characters');
        }
        if (!phone) {
          return res.status(400).send({ error: "Phone no is Required or you have typed wrong phone number" });
        }
        if (phone.length < 10  || phone.length > 10 ) {
          return res.status(400).send({ error: "You have typed wrong phone number" });
        }
        if (!address) {
          return res.status(400).send({ error: "Address is Required" });
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


//Login

export const loginController = async (req,res) => {

  try {

    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user already exists
    const user = await userModel.findOne({ Email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d",});
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        email: user.Email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });

  }

};


//test for protected routes
export const testController = (req,res) => {

  try {
    res.send("Protected Routes");

  } catch (error) {
    return res.status(500).send(error)
  }

};