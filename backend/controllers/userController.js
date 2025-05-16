import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// creating a jsonwebtoken

const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


//login user

const loginUser = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {

        const user =  await userModel.findOne({email});

        //if user exists in the db
        if(!user){
            return res.json({success  : false ,
                               message : "User not found "
            })
        }
        // password matches or not 

        const isMatch = await bcrypt.compare( password , user.password);

        if(!isMatch){
            return res.json({success : false ,
                              message : "Enter Correct Password .."
            })
        }

        const token = createtoken(user._id);
        res.json({success : true , message : "Login succesfull" , token : token })



    }

    catch(error){
        console.log(error)
          res.json({success : false , message : "Login unsuccesfull" })
    }


};


// signup user
const signupUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  try {
    const exists = await userModel.findOne({ email });

    // if the email already exists or not

    if (exists) {
      return res.json({ success: false, message: "The user already Exits" });
    }

    // validating the email

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email is not valid" });
    }

    // validating the password length

    if (password.length < 5) {
      return res.json({
        success: false,
        message: "Enter a strong password : min 5 characters",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(7);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    const user = await newUser.save();

    const token = createtoken(user._id);

    res.json({ success: true, token: token , message : "Account Created .."});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some Error occurred .." });
  }
};

export { loginUser, signupUser };
