import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, 
  FaChalkboardTeacher, FaUserGraduate 
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserdata } from '../redux/userSlice';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role, setRole] = useState("student"); 
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup", 
        {name, password, email, role}, 
        {withCredentials: true}
      );
      dispatch(setUserdata(result.data))
      toast.success("Signup Successful");
      navigate("/home");
    } catch(error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side image */}
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

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-600 mt-2">Get started with your free account</p>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
              <div className="flex justify-center space-x-6">
                <div 
                  className={`flex flex-col items-center cursor-pointer transition-all ${role === 'educator' ? 'transform scale-105' : ''}`}
                  onClick={() => setRole('educator')}
                >
                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${role === 'educator' ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-100 border-2 border-transparent'}`}>
                    <FaChalkboardTeacher className={`text-2xl ${role === 'educator' ? 'text-indigo-600' : 'text-gray-500'}`} />
                    {role === 'educator' && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">PREMIUM</span>
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${role === 'educator' ? 'text-indigo-600' : 'text-gray-600'}`}>Educator</span>
                </div>
                
                <div 
                  className={`flex flex-col items-center cursor-pointer transition-all ${role === 'student' ? 'transform scale-105' : ''}`}
                  onClick={() => setRole('student')}
                >
                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${role === 'student' ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-100 border-2 border-transparent'}`}>
                    <FaUserGraduate className={`text-2xl ${role === 'student' ? 'text-indigo-600' : 'text-gray-500'}`} />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${role === 'student' ? 'text-indigo-600' : 'text-gray-600'}`}>Student</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    minLength="8"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-indigo-500" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-indigo-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-3 text-sm font-medium text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? <ClipLoader size={30} color='white' /> : "Create Account"}
              </button>
            </form>

            {/* Google sign-up */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">Or sign up with</span>
              </div>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FcGoogle className="text-xl" />
              <span className="font-medium">Continue with Google</span>
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
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