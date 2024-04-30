import express from "express";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import {registerController} from "../controllers/authController.js"; 
// import {authController} from "../controllers/authController.js"

const router=express.Router();

// GET requests
router.get('/',(req,res)=>{
    res.send("<h1>Hello</h1>");
});

router.get("/explore",async (req,res)=>{
    if(req.query.search==="")return null;
    try {
        const response=await productModel.aggregate([
            {
              $search: {
                index: "search_products",
                text: {
                  query: req.query.search,
                  path: ["product_name","product_sub_catagory"],
                },
              },
            },
            {
              $sort: {
                product_rating: -1,
              },
            },
            {
              $limit: 30,
            },
          ]);
        //   console.log(result.length);
        setTimeout(()=>{
            return res.status(200).json(response);
        },1000);
    } catch (error) {
        console.log(error);
    }
});

router.get("/getProduct",async (req,res)=>{
    try {
        const response=await productModel.findOne({_id:req.query.id});
        setTimeout(() => {
            res.status(200).json(response);
        }, 1000);
    } catch (error) {
        console.log(error);
    }
});


router.get("/verifyTokenAndGetUser",async (req,res)=>{
    const token=req.header("Authorization"); 

    if(!token){
        return res.status(401).json({msg:"Unauthorized HTTP, Token not provided"});
    }

    const jwtToken=token.replace("Bearer","").trim();
    console.log(jwtToken);

    try {
        const isVerified=jwt.verify(jwtToken,process.env.SECRET_KEY);
        console.log(isVerified);
    } catch (error) {
        return res.status(401).json({msg:"Unauthorized. Invalid Token"});
    }
});




// POST requests
router.post('/register',async (req,res)=>{
    const {username,email,password}=req.body;

    if(!username || !email || !password){
        return res.status(401).json({msg:"Please fill out all fields."});
    }

    // check user existance and then register
    try{
        const usernameExist=await userModel.findOne({username:username});
        const emailExist=await userModel.findOne({email:email});

        if(usernameExist){
            return res.status(403).json({msg:"Username already exist."});
        }

        if(emailExist){
            return res.status(403).json({msg:"A user with provided email, already exist"});
        }

        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        console.log(hashedPassword);

        const newUser=new userModel({username,email,password:hashedPassword,cart:[],address:[]});
        console.log(newUser);

        await newUser.save();

        res.status(201).json({msg:"User registered successfuly",userdata:newUser});
    }catch(err){
        console.log(err);
    }
});

router.post("/login",async (req,res)=>{
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(401).json({ msg: "Please enter all fields"});
    }

    console.log(req.body);

    // check user existance and then login
    try{
        const userExist=await userModel.findOne({username:username});
        if(!userExist){
            res.status(402).json({msg:"Invalid Credentials"});
        }

        // console.log(userExist);
        const isMatch=await bcrypt.compare(password,userExist.password);
        // console.log(isMatch);
        if(!isMatch){
            return res.status(402).json({msg:"Invalid Credentials"});
        }

        if(userExist.tokens.length===0){
            const token=await userExist.generateJWT();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            }); 
        }
        

        res.status(201).json({msg:"User Login Successful",userdata:userExist});
    }catch(err){
        console.log(err);
    }
});


router.post("/addItemToCart",(req,res)=>{
    for(let i=0;i<req.body.cart.length;i++){
        console.log(req.body.cart[i]);
    }
});



export default router;