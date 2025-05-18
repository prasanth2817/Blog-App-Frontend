import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = { name, email, password };

    if (!payload.name || !payload.email || !payload.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 201) {
        toast.success(data.message);
        navigate("/login");
      } else {
        throw new Error(data.message || "Error signing up!");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-600">
      <div className="w-9/12 md:w-full max-w-sm p-6 rounded-lg shadow-slate-800 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70">
        <h2 className="text-3xl font-semibold lg:font-bold text-center text-gray-300">
          Sign <span className="text-blue-500 font-extrabold text-4xl">Up</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-base font-mono label-text">Name</label>
            <input
              type="text"
              value={name}
              autoFocus
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-slate-500 rounded-lg input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <div>
            <label className="text-base font-mono label-text">Email address</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-500 rounded-lg input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <div>
            <label className="text-base font-mono label-text">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-500 rounded-lg input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`bg-slate-500 text-black text-sm font-mono btn-block rounded-lg btn-sm mt-2 p-1.5 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="text-slate-900 font-normal">
                {loading ? "Signing Up..." : "Sign Up"}
              </span>
            </button>
          </div>

          <p className="text-center text-sm mt-4 text-gray-700">
            Already have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
