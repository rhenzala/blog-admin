import { useState } from "react";
import { register } from "../utils/api";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await register(username, email, password, confirmPassword);
      setSuccess("Registration successful! You can now login.");
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setError(err.response.data.errors.map((error) => error.msg).join(", "));
      } else if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-zinc-300 dark:bg-zinc-700  p-8 rounded-xl flex flex-col gap-4 max-w-xs"
      >
        <h2 className="text-2xl font-semibold">Register an account</h2>

        {error && (
          <ul className="text-rose-500 text-xs text-pretty">
            {error.split(",").map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        )}
        {success && <p className="text-green-500">{success}</p>}

        <label htmlFor="username" className="flex flex-col gap-1">
          <span className="text-sm">Username</span>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-48 lg:w-64 focus:outline-1 focus:outline-blue-500 p-2 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
            required
          />
        </label>
        <label htmlFor="email" className="flex flex-col gap-1">
          <span className="text-sm">Email</span>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-48 lg:w-64  focus:outline-1 focus:outline-blue-500 p-2 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
            required
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-1">
          <span className="text-sm">Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-48 lg:w-64 focus:outline-1 focus:outline-blue-500 p-2 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm pr-10"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 outline-none hover:text-blue-500 focus:text-blue-500 rounded-sm"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </label>
        <label htmlFor="confirmPassword" className="flex flex-col gap-1">
          <span className="text-sm">Confirm Password</span>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-48 lg:w-64 focus:outline-1 focus:outline-blue-500 p-2 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm pr-10"
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 outline-none hover:text-blue-500 focus:text-blue-500 rounded-sm"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-1 dark:focus:outline-zinc-100 focus:outline-zinc-700 hover:cursor-pointer transition delay-200 ease-in mt-4"
        >
          Register
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-rose-500 outline-none focus:text-rose-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
