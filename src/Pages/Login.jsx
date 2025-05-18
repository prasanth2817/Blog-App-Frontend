import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../Hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-600">
      <div className="w-9/12 md:w-full max-w-sm p-6 rounded-lg shadow-slate-800 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70">
        <h1 className="text-3xl font-mono text-center text-gray-300 mb-6">
          <span className="text-blue-500 font-extrabold">Login</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-black text-base font-mono">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 bg-slate-500 rounded-lg input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-black text-base font-mono">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 bg-slate-500 rounded-lg input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm mt-2">
            <Link
              to="/signup"
              className="text-slate-800 hover:text-blue-600 hover:underline"
            >
              Don’t have an account?
            </Link>
            <Link
              to="/forgot-password"
              className="text-slate-800 hover:text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-slate-500 text-black text-lg font-mono rounded-lg btn-sm mt-4 p-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      <div className="mt-10 text-gray-300 font-mono text-sm text-center">
        <h3 className="text-lg mb-1">Sample User Login</h3>
        <p>
          <strong>Email:</strong> arunkumar123@gmail.com
        </p>
        <p>
          <strong>Password:</strong> 12345678
        </p>
      </div>
    </div>
  );
};

export default Login;
