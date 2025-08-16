import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './model/courseModel.js';
import Lecture from './model/lectureModel.js';

dotenv.config();

const testDatabase = async () => {
  try {
    console.log('🔍 Testing database connection...');
    
    const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
    if (!mongoUri) {
      console.error('❌ No MongoDB connection string found');
      return;
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ Database connected successfully');
    
    // Test course creation
    console.log('🔍 Testing course creation...');
    const testCourse = await Course.create({
      title: 'Test Course',
      category: 'Web Development',
      creator: new mongoose.Types.ObjectId()
    });
    console.log('✅ Test course created:', testCourse._id);
    
    // Test lecture creation
    console.log('🔍 Testing lecture creation...');
    const testLecture = await Lecture.create({
      lectureTitle: 'Test Lecture'
    });
    console.log('✅ Test lecture created:', testLecture._id);
    
    // Test adding lecture to course
    testCourse.lectures.push(testLecture._id);
    await testCourse.save();
    console.log('✅ Lecture added to course');
    
    // Test population
    await testCourse.populate('lectures');
    console.log('✅ Course populated with lectures');
    
    // Clean up
    await Course.findByIdAndDelete(testCourse._id);
    await Lecture.findByIdAndDelete(testLecture._id);
    console.log('✅ Test data cleaned up');
    
    await mongoose.disconnect();
    console.log('✅ Database disconnected');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

testDatabase();
