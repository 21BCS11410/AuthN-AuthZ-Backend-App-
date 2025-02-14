
//These are the three middlewares
//auth, isStudent, isAdmin

const jwt = require('jsonwebtoken');
require("dotenv").config();


exports.auth = (req, res, next) => {
    try{
        //extract jwt token
        //there are three ways to fetch token
        
        console.log("cookies", req.cookies.token);
        console.log("body", req.body.token);
        console.log("header", req.header("Authorization"));
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
  
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        //verify token
        try{
            //verify is a fuction in jwttoken library which give decoded token
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            
            //store this decode in your req
            req.user = payload;

        } catch(error){
            return res.status(401).json({
                success: false,
                message: "Token is Invalid",
            });
        }

        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token",
        })
    }
};

exports.isStudent = (req, res, next) => {
    try{
        // because in auth middleware we have added decode in our request so we can 
        // fetch role from req 
        if(req.user.role != "Student"){
            return res.staus(401).json({
                success: "false",
                message: "This is a protected route for student and you are not a studnet",
            });
        };
        next();


    } catch(error){
        return res.status(500).json({
            success: false,
            message: "You are not a Student",
        })
    }
};

exports.isAdmin = (req, res, next) => {
    try{
        // because in auth middleware we have added decode in our request so we can 
        // fetch role from req 
        if(req.user.role != "Admin"){
            return res.staus(401).json({
                success: "false",
                message: "This is a protected route for admin and you are not an admin",
            });
        };
        next();


    } catch(error){
        return res.status(500).json({
            success: false,
            message: "You are not an Admin",
        })
    }
};
