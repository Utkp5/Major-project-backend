import userModel from "../Models/user.js";
import orderModel from "../Models/orders.js";
import { comparePassword, hashPassword } from "../Helpers/authHelper.js";
import emailValidator from "email-validator";
import  Jwt  from "jsonwebtoken";

//Registration logic
export const registerController = async (req,res) => {

    try {

        const {firstName, lastName, Email, password, phone, address, answer} = req.body;

        //validations
        if (!firstName) {
          return res.status(400).send({ message: "firstName is Required" });
        }
        if (!lastName) {
          return res.status(400).send({ message: "lastName is Required" });
        }
        if (firstName === lastName) {
          return res.status(400).send({ message: 'firstname and lastname should not same'})
        }
        if (!emailValidator.validate(Email)) {
          return res.status(400).send({ message: "Email is not correct" });
        }
        if (!Email) {
          return res.status(400).send({ message: 'Email is required'})
        }
        if (!password) {
          return res.status(400).send({ message: "Password is Required" });
        }
        if (password.length < 8) {
          return res.status(400).send('Password should have min 8 characters');
        }
        if (!phone) {
          return res.status(400).send({ message: "Phone no is Required or you have typed wrong phone number" });
        }
        if (phone.length < 10  || phone.length > 10 ) {
          return res.status(400).send({ message: "You have typed wrong phone number" });
        }
        if (!address) {
          return res.status(400).send({ message: "Address is Required" });
        }
        if (!answer) {
          return res.status(400).send({ message: "Answer is Required for security person" });
        }
    
        //check user
        const exisitingUser = await userModel.findOne({ Email });

        //exisiting user
        if (exisitingUser) {
            return res.status(500).send({
              success: false,
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
          answer,
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
        role: user.role,
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


//forgot password 
export const ForgotpasswordController = async (req,res) => {

  try {
    
    const {Email, answer, newPassword} = req.body
    
    if (!Email) {
      return res.status(400).send({message : 'Email is required'})
    }
    if (!answer) {
      return res.status(400).send({message : 'answer is required'})
    }
    if (!newPassword) {
      return res.status(400).send({message : 'newPassword is required'})
    }
    //check
    const user = await userModel.findOne({Email,answer});
    if (!user) {
      return res.status(401).send({
        success : false,
        message : 'Wrong email or answer'
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    return res.status(200).send({
      success: true,
      message : "Password reset successfully",
    });
  } catch (error) {
    return res.send({
      success : false,
      message:'something went wrong',
      error
    });
  }

}

//update profile 
export const updateProfileController = async (req, res) => {
  try {
    const { firstName, Email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 8) {
      return res.json({ error: "Passsword is required and 8 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: firstName || user.firstName,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Update profile",
      error,
    });
  }
};


// get orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};


//all orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};



//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};