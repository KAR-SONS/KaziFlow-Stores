import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        // CREATE AUTH USER
        const { data, error } = await supabase.auth.signUp({
        display_name: name,
        email,
        password,
        });

        if (error) {
        alert(error.message);
        return;
        }

        alert('Signup successful ! ')
        navigate('/profile-setup');

    }
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-white">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent mb-2">
              KaziFlow Stores
            </h1>
            <p className="text-gray-600">Create your account and start connecting</p>
          </div>

          <div className="bg-white border-2 border-blue-100 rounded-2xl p-8">
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-black">First Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="px-3 py-1 border border-blue-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-black">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-3 py-1 border border-blue-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-black">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="px-3 py-1 border border-blue-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 text-black"
                  />
                </div>
              
                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-600 text-white font-bold h-11 rounded-lg"
                >
                  Create Account
                </button>
              </div>
              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-800 font-semibold hover:text-blue-600">
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage