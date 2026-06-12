import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import supabase from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { storeSlug } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) return;

      const { data: storeData } = await supabase
        .from('stores')
        .select('id')
        .eq('user_id', user.id)
        .eq('store_slug', storeSlug)
        .single();

      if (storeData) {
        navigate(`/${storeSlug}/seller-dashboard`, { replace: true });
      }
    };

    checkUser();
  }, [navigate, storeSlug]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (!data?.user) {
      alert('Unable to log in. Please try again.');
      return;
    }

    alert('Login successful');
    navigate(`/${storeSlug}/seller-dashboard`);
  };
  return (
     <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-white">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-[oklch(0.35_0.08_50)] mb-2">
              {`Welcome back ${storeSlug.toUpperCase()}`}
            </h1>
            <p className="text-gray-600">Welcome back! Login to continue</p>
          </div>

          <div className="bg-white border-2 border border-[oklch(0.92_0.01_70)] rounded-2xl p-8">
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <label className="text-md font-semibold text-black">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-3 py-1 border border-[oklch(0.92_0.01_70)] focus:ring-[oklch(0.92_0.01_70)] focus:border-[oklch(0.92_0.01_70)] rounded-lg h-10 text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-md font-semibold text-black">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="px-3 py-1 border border-[oklch(0.92_0.01_70)] focus:ring-[oklch(0.92_0.01_70)] focus:border-[oklch(0.92_0.01_70)] rounded-lg h-10 text-black"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[oklch(0.35_0.08_50)] text-white font-bold h-11 rounded-lg"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login