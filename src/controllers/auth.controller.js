const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')

async function registerController(req,res){
    // Your existing register code is perfect, no changes needed here.
    const {username,password}=req.body;

    // Check for email if you add it to the model and frontend later
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser=await userModel.findOne({
        username
    })

    if(existingUser){
        return res.status(409).json({
            message:"username already exist"
        })
    }
    const user=await userModel.create({
        username,
        password:await bcrypt.hash(password,10)
    })

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET, { expiresIn: '1d' }) // Good practice to add an expiry

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

    res.status(201).json({
        message:"user created successfully"
    })
}

async function loginController(req,res){
    // Your existing login code is also perfect.
    const {username,password}=req.body;
    const user=await userModel.findOne({
        username
    })

    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            username:user.username,
            id:user._id
        }
    })
}

// ✅ NEW: Logout Controller
async function logoutController(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: "User logged out successfully" });
}

// ✅ NEW: Controller to get the current logged-in user
async function getCurrentUserController(req, res) {
    // req.user is attached by your authMiddleware
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
}


module.exports={
    registerController,
    loginController,
    logoutController,       // Export new controller
    getCurrentUserController // Export new controller
}
