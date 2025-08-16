import express from "express"
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorById, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture } from "../controller/courseController.js"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import multer from "multer"

const courseRouter = express.Router()

// Multer error handler wrapper
const handleMulterUpload = (fieldName) => {
  return (req, res, next) => {
    console.log(`🔧 handleMulterUpload called for field: ${fieldName}`)
    upload.single(fieldName)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.log(`❌ Multer error: ${err.message}`)
                 if (err.code === 'LIMIT_FILE_SIZE') {
           return res.status(400).json({ message: 'File too large. Max size is 500MB.' });
         }
        return res.status(400).json({ message: `Upload error: ${err.message}` });
      } else if (err) {
        console.log(`❌ Other error: ${err.message}`)
        return res.status(500).json({ message: `Server error: ${err.message}` });
      }
      console.log(`✅ handleMulterUpload completed successfully`)
      next();
    });
  };
};

//for courses
courseRouter.post("/create", isAuth, createCourse)
courseRouter.get("/getpublished",getPublishedCourses)
courseRouter.get("/getcreator", isAuth, getCreatorCourses)
courseRouter.post("/editcourse/:courseId",isAuth, handleMulterUpload("thumbnail"), editCourse)
courseRouter.get("/getcourse/:courseId",isAuth,getCourseById)
courseRouter.delete("/remove/:courseId", isAuth, removeCourse)


//for lectures
courseRouter.post("/createlecture/:courseId", isAuth, createLecture)
courseRouter.get("/courselecture/:courseId", isAuth, getCourseLecture)
courseRouter.post("/editlecture/:lectureId", isAuth, (req, res, next) => {
  upload.single("videoUrl")(req, res, (err) => {
    if (err) {
      console.log("❌ Multer error in route:", err)
             if (err instanceof multer.MulterError) {
         if (err.code === 'LIMIT_FILE_SIZE') {
           return res.status(400).json({ message: 'File too large. Max size is 500MB.' });
         }
         return res.status(400).json({ message: `Upload error: ${err.message}` });
       }
      return res.status(500).json({ message: `Server error: ${err.message}` });
    }
    next();
  });
}, editLecture)

// Test route to check if the issue is with the route
courseRouter.post("/test-editlecture/:lectureId", isAuth, (req, res) => {
  console.log("🔍 Test route called")
  console.log("🔍 Params:", req.params)
  console.log("🔍 Body:", req.body)
  console.log("🔍 File:", req.file)
  res.json({ message: "Test route working" })
})
courseRouter.delete("/removelecture/:lectureId", isAuth, removeLecture)
courseRouter.post("/creator",isAuth,getCreatorById)


export default courseRouter