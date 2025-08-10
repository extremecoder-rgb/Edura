import { Link } from 'react-router-dom';
import { FaBookOpen, FaGraduationCap } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaBookOpen className="text-indigo-600 text-2xl" />
            <span className="text-xl font-bold">Edura</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/signin" className="px-4 py-2 text-indigo-600 hover:text-indigo-800">
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Learn Without Limits
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Master new skills with our interactive courses designed for all levels.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/signup"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Get Started
          </Link>
          <Link
            to="/courses"
            className="px-8 py-3 text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200"
          >
            Browse Courses
          </Link>
        </div>
      </main>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaGraduationCap className="text-indigo-600 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from industry professionals with real-world experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaBookOpen className="text-indigo-600 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Diverse Courses</h3>
            <p className="text-gray-600">
              100+ courses covering tech, business, and creative skills.
            </p>
          </div>
        </div>
      </section>

      
      <footer className="bg-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500">
          © {new Date().getFullYear()} Edura. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;