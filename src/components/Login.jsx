import { useState } from "react";
import { login } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const data = await login(username, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={handleLogin} className="bg-zinc-300 dark:bg-zinc-700 p-8 rounded-xl flex flex-col gap-4 w-fit">
                <h2 className="text-2xl font-semibold">Login</h2>

                {error && <p className="text-rose-500 text-xs text-pretty">{error}</p>}

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

                <label htmlFor="password" className="flex flex-col gap-1 relative">
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

                <button type="submit" className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-1 dark:focus:outline-zinc-100 focus:outline-zinc-700 hover:cursor-pointer transition delay-200 ease-in mt-4">
                    Login
                </button>
                
                <p className="mt-4 text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:text-rose-500 outline-none focus:text-rose-500">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
