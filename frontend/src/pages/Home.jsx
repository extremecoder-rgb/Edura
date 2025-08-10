import { Link } from 'react-router-dom';
import { FaBookOpen, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaBookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Edura</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/signin" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Learn Without Limits
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Start, switch, or advance your career with thousands of courses and certifications.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/signup"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
            <Link
              to="/courses"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Why Choose Edura?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <FaGraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Expert Instructors</h3>
              <p className="mt-2 text-base text-gray-500">
                Learn from industry experts with real-world experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <FaBookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Diverse Courses</h3>
              <p className="mt-2 text-base text-gray-500">
                1000+ courses across various disciplines and skill levels.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <FaChalkboardTeacher className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Interactive Learning</h3>
              <p className="mt-2 text-base text-gray-500">
                Hands-on projects and interactive lessons.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Edura. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;