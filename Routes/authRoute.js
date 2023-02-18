const express = require('express');
import {registerController} from "../Controllers/authController.js";
const router = express.Router();

//we are following MVC pattern...

router.post("/Register", registerController)




module.exports = router;