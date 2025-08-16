import Course from "../model/courseModel.js"
import { uploadImageToCloudinary, uploadVideoToCloudinary } from "../config/cloudinary.js"
import Lecture from "../model/lectureModel.js"
import User from "../model/userModel.js" 

export const createCourse = async (req,res) => {
    try{
        const {title, category} = req.body
        if(!title || !category){
            return res.status(400).json({message:"title or category is required"})
        }
        const course = await Course.create({
            title,
            category,
            creator:req.userId
        })
        return res.status(201).json(course)
    } catch(error){
        return res.status(500).json({message:`CreateCourse error ${error}`})
    }
}

export const getPublishedCourses = async (req,res) => {
    try{
        const courses = await Course.find({isPublished:true}).populate("lectures")
        if(!courses){
            return res.status(400).json({message:"No courses found"})
        }
        return res.status(200).json(courses)
    } catch(error){
        return res.status(500).json({message:`failed to get isPublished Courses ${error}`})
    }
}

export const getCreatorCourses = async (req,res) => {
    try{
        const userId = req.userId
        const courses = await Course.find({creator:userId})
        if(!courses){
            return res.status(400).json({message:"Courses is not found"})
        }
        return res.status(200).json(courses)
    } catch(error) {
        return res.status(500).json({message:`failed to get Creator Courses ${error}`})
    }
}

export const editCourse = async (req,res) => {
    try{
        const {courseId} = req.params
        const {title, subTitle, description, category, level, isPublished, price} = req.body
        let thumbnail
        if(req.file){
            thumbnail = await uploadImageToCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        const updateData = {title, subTitle, description, category, level, isPublished, price, thumbnail}
        course = await Course.findByIdAndUpdate(courseId,updateData,{new:true})
        return res.status(200).json(course)
    } catch(error) {
        return res.status(500).json({message:`failed to edit course ${error}`})
    }
}

export const getCourseById = async (req,res) => {
    try{
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        return res.status(200).json(course)
    } catch(error) {
        return res.status(500).json({message:`failed to get course by id ${error}`})
    }
}

export const removeCourse = async (req,res) => {
    try{
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        course = await Course.findByIdAndDelete(courseId, {new:true})
        return res.status(200).json("Course removed")
    } catch(error) {
        return res.status(500).json({message:`failed to delete course by id ${error}`})
    }
}

//for lecture
export const createLecture = async (req,res) => {
    try{
        console.log("🔍 createLecture called with:", { body: req.body, params: req.params })
        
        const {lectureTitle} = req.body
        const {courseId} = req.params
        
        // Validate input
        if(!lectureTitle || !lectureTitle.trim() || !courseId){
            console.log("❌ Missing required fields:", { lectureTitle, courseId })
            return res.status(400).json({message:"lectureTitle is required and cannot be empty"})
        }
        
        // Validate courseId format
        if(!courseId.match(/^[0-9a-fA-F]{24}$/)){
            console.log("❌ Invalid courseId format:", courseId)
            return res.status(400).json({message:"Invalid course ID format"})
        }
        
        // First check if course exists
        console.log("🔍 Searching for course with ID:", courseId)
        const course = await Course.findById(courseId)
        if(!course){
            console.log("❌ Course not found:", courseId)
            return res.status(404).json({message:"Course not found"})
        }
        console.log("✅ Course found:", course.title)
        
        // Create the lecture
        const trimmedTitle = lectureTitle.trim()
        console.log("🔍 Creating lecture with title:", trimmedTitle)
        const lecture = await Lecture.create({lectureTitle: trimmedTitle})
        console.log("✅ Lecture created:", lecture._id)
        
        // Add lecture to course
        course.lectures.push(lecture._id)
        
        // Fix validation issues before saving
        if (course.level === '') {
            course.level = undefined; // Remove empty string to avoid enum validation error
        }
        
        // Use findByIdAndUpdate to avoid validation issues
        await Course.findByIdAndUpdate(course._id, {
            $push: { lectures: lecture._id }
        })
        console.log("✅ Lecture added to course")
        
        // Populate lectures and return
        await course.populate("lectures")
        console.log("✅ Course populated with lectures")
        
        return res.status(201).json({lecture, course})
    } catch(error) {
        console.error("💥 createLecture error:", error)
        return res.status(500).json({message: `failed to create Lecture ${error.message}`})
    }
}

export const getCourseLecture = async(req,res) => {
    try{
        console.log("🔍 getCourseLecture called with courseId:", req.params.courseId)
        
        const {courseId} = req.params
        
        // Validate courseId format
        if(!courseId.match(/^[0-9a-fA-F]{24}$/)){
            console.log("❌ Invalid courseId format:", courseId)
            return res.status(400).json({message:"Invalid course ID format"})
        }
        
        const course = await Course.findById(courseId)
        if(!course){
            console.log("❌ Course not found:", courseId)
            return res.status(404).json({message:"Course is not found"})
        }
        console.log("✅ Course found:", course.title)
        
        await course.populate("lectures")
        console.log("✅ Lectures populated, count:", course.lectures.length)
        
        return res.status(200).json({lectures: course.lectures})
    } catch(error){
        console.error("💥 getCourseLecture error:", error)
        return res.status(500).json({message:`failed to getCourseLecture ${error.message}`})
    }
}

export const editLecture = async (req, res) => {
  try {
    console.log("🔍 editLecture called with params:", req.params)
    console.log("🔍 editLecture body:", req.body)
    console.log("🔍 editLecture file:", req.file)
    console.log("🔍 editLecture headers:", req.headers['content-type'])
    
    const { lectureId } = req.params
    const { isPreviewFree, lectureTitle } = req.body

    console.log("🔍 Searching for lecture with ID:", lectureId)
    let lecture = await Lecture.findById(lectureId)
    console.log("🔍 Found lecture:", lecture)
    if (!lecture) {
      console.log("❌ Lecture not found:", lectureId)
      return res.status(404).json({ message: "Lecture is not found" })
    }

    // Handle video upload
    if (req.file) {
      // Check file size - Cloudinary free tier has limits
      const fileSizeInMB = req.file.size / (1024 * 1024)
      console.log(`File size: ${fileSizeInMB.toFixed(2)} MB`)
      
      if (fileSizeInMB > 100) {
        // File is too large for Cloudinary free tier
        console.log("File too large for Cloudinary, using local storage")
        lecture.videoUrl = `/uploads/${req.file.filename}`
      } else {
                 try {
           const videoUrl = await uploadVideoToCloudinary(req.file.path)
           if (videoUrl) {
             lecture.videoUrl = videoUrl
           }
         } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError)
          
          // Fallback to local storage
          lecture.videoUrl = `/uploads/${req.file.filename}`
          console.log("Using local file path as fallback:", lecture.videoUrl)
        }
      }
    }

    // Update other fields
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle
    }
    if (typeof isPreviewFree !== "undefined") {
      lecture.isPreviewFree = isPreviewFree === "true" || isPreviewFree === true
    }

    await lecture.save()
    return res.status(200).json(lecture)
  } catch (error) {
    console.error("editLecture error:", error)
    return res.status(500).json({ message: `failed to edit Lecture ${error.message}` })
  }
}



export const removeLecture = async(req,res) => {
    try{
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(404).json({message:"Lecture is not found"})
        }
        await Course.updateOne(
            {lectures: lectureId},
            {$pull:{lectures:lectureId}}
        )
        return res.status(200).json({message:"Lecture Removed"})
    } catch(error){
        return res.status(500).json({message:`failed to remove Lecture ${error}`})
    }
}

export const getCreatorById = async (req,res) => {
    try{
        const {userId} = req.body
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User is not found"}) 
        }
        return res.status(200).json(user)
    } catch(error) {
        return res.status(500).json({message:`Failed to get Creator ${error}`})
    }
}

