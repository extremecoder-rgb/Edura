import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { serverUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = async () => {
    setLoading(true)
    try{
      const result = await axios.post(serverUrl + "/api/auth/signin", {email, password}, {withCredentials:true})
      dispatch(setUserData(result.data))
      setLoading(false)
      toast.success("Login Successfully")
      navigate("/home");
    } catch(error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden lg:block w-1/2 relative bg-indigo-700">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-90"

        />
        <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-xl max-w-md">Join thousands of students achieving their goals</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
            <p className="text-gray-600 mt-2">Access your learning dashboard</p>
          </div>

          <form onSubmit={(e)=>e.preventDefault()} className="space-y-5">
    
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
        </div>
        <input
          id="email"          
           name="email"
          type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-5focus:border-transparent"
             placeholder="your@email.com"
             required
            autoComplete="username"
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  autoComplete="current-password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? <ClipLoader size={30} color='white'/>:"Sign In"}
            </button>
          </form>

  
       <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-gray-500">Or continue with</span>
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
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;