const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//signup router handler
exports.signup = async (req, res) => {
    try{
        //get data
        const {name, email, password, role} = req.body;

        //check if user already exists or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Error in Hashing Password',
            });
        }

        //create entry for user
        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success: false,
            message: 'User created Successfully',
        });

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again later',
        });
    }
}


//login route handler

exports.login = async(req, res) => {
    try{
        //data fetch
        const {email, password} = req.body;

        //validation on email and passeord
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details completely',
            });
        }

        //check for registered user
        let user = await User.findOne({email});
        if(!User){
            return res.status(401).json({
                success: false,
                message: 'This user does not exists',
            })
        }

        //generate a payload to pass in the jwt token further
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        //verify password and generate a JWT token

        if(await bcrypt.compare(password, user.password)){
            //password matched
            
            //generate a jwt token
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            
            //to add our token into user first convert user in object
            user = user.toObject();
            user.token = token;
            /* because we are sending our user object in cookie so 
            we will make password undefined in our user object only
            */
           user.password = undefined;

            /*returning our response as a cookie which includes jwt token 
                which we created just now
            */
            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000 ),
                httpOnly: true
            }

            res.cookie("GauravFirstCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User LoggedIn successfully'
            });

        }
        else{
            //passwords don't match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }

    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            succcess: false,
            message: "LogIn failure"
        });
    }
}

