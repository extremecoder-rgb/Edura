//verify tokens using jsonwebToken

import jwt from "jsonwebtoken"

const isAuth = async (req,res,next) => {
    try {
        console.log("🔐 isAuth middleware called");
        console.log("🍪 Cookies received:", req.cookies);
        
        let {token} = req.cookies
        if(!token){
            console.log("❌ No token found in cookies");
            return res.status(400).json({message: "user doesn't have token"})
        }
        
        console.log("🔑 Token found:", token.substring(0, 20) + "...");
        
        let verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken) {
            console.log("❌ Token verification failed");
            return res.status(400).json({message: "user doesn't have valid token" })
        }
        
        console.log("✅ Token verified successfully, userId:", verifyToken.userId);
        req.userId = verifyToken.userId
        next()
    } catch(error){
        console.error("💥 isAuth error:", error);
        return res.status(500).json({message: `isAuth error ${error}`})
    }
}

export default isAuth
