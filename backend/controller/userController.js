import User from "../model/userModel.js"

export const getCurrentUser = async(req,res) => {
    try{
        const user = await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(404).json({message: "User not Found"})
        }
        return res.status(200).json(user)
    } catch(error){
        return res.status(500).json({message:`GetCurrentUser error ${error}`})

    }
}

export const updateProfile = async (req,res) => {
    try {
        //request userId from userId, description, name from body
        //check if req.file is present then upload on cloudinary in the file path
        //find user and update name, description , photoUrl
    } catch(error) {
        //error console
    }
}