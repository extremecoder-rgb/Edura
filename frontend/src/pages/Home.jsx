import { Link } from 'react-router-dom';
import { FaBookOpen, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
    </div>
  );
};

export default Home;