const {Router}=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config()
const UserRoutes=Router();

const {UserModel}=require('../model/userModel');

// <------------- Signup
UserRoutes.post('/Signup',async(req,res)=>{
    const {email,name,password}=req.body;
    const data = await UserModel.find({ email });

    if (data.length > 0) {
           res.send("you are signup already");
    } else {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          res.send("Error while hashing password");
        }
          const user = new UserModel({
          name,
          email,
          password: hash,
           
        });
          try {
          await user.save();
          res.send("Sign successfully.");
        } catch (error) {
                 res.send("Failed to save into database");
        }
      });
    }
})

// <------------------ Login
UserRoutes.post("/Login", async (req, res)=>{
    const {email, password} = req.body;

    const User = await UserModel.findOne({email})
    if(!User){
        res.send("Please Sign Up")
    }
    else{
        const hash = User.password;
        bcrypt.compare(password, hash, function(err, result) {
        
            if(result){
                const token = jwt.sign({ userId: User._id }, process.env.SECRET_KEY);
                res.send({"message":"Login successfully", token})
            }else{

                res.send("Login failed, invalid credentials")

            }
        });
    }
})




module.exports={UserRoutes}