//token generation for auth->
import jwt from "jsonwebtoken"

const genToken = async (userId) => {
    try{
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"} )
        console.log("Token generated successfully")
        return token // Return the token
    } catch (error) {
        console.error("Token generation error:", error)
        throw error // Re-throw the error
    }
}

export default genToken