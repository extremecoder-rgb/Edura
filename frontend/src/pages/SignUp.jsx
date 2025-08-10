import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, 'User type:', userType);
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden lg:block w-1/2 relative bg-indigo-700">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.1.0&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-indigo-900 opacity-70"></div>
        <div className="relative h-full flex flex-col justify-end p-10 text-white">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl max-w-md">
            Start your learning journey today with access to thousands of courses
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-600 mt-2">Get started with your free account</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
              <div className="flex justify-center space-x-6">
                <div 
                  className={`flex flex-col items-center cursor-pointer transition-all ${userType === 'educator' ? 'transform scale-105' : ''}`}
                  onClick={() => setUserType('educator')}
                >
                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${userType === 'educator' ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-100 border-2 border-transparent'}`}>
                    <FaChalkboardTeacher className={`text-2xl ${userType === 'educator' ? 'text-indigo-600' : 'text-gray-500'}`} />
                    {userType === 'educator' && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">PREMIUM</span>
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${userType === 'educator' ? 'text-indigo-600' : 'text-gray-600'}`}>Educator</span>
                </div>
                
                <div 
                  className={`flex flex-col items-center cursor-pointer transition-all ${userType === 'student' ? 'transform scale-105' : ''}`}
                  onClick={() => setUserType('student')}
                >
                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${userType === 'student' ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-100 border-2 border-transparent'}`}>
                    <FaUserGraduate className={`text-2xl ${userType === 'student' ? 'text-indigo-600' : 'text-gray-500'}`} />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${userType === 'student' ? 'text-indigo-600' : 'text-gray-600'}`}>Student</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
          
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

          
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    minLength="8"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-indigo-500" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-indigo-500" />
                    )}
                  </button>
                </div>
              </div>

         
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    minLength="8"
                  />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                disabled={!userType}
              >
                Create Account
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">Or sign up with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FcGoogle className="text-xl" />
              <span className="font-medium">Continue with Google</span>
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;