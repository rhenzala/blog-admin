import { useState } from "react";
import { login } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const Login = ({setUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

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
            <form onSubmit={handleLogin} className="bg-zinc-300 dark:bg-zinc-700 py-12 px-8 rounded-lg flex flex-col gap-4 w-fit">
            {error && <p className="text-red-500">{error}</p>}
                <label htmlFor="username" className="flex flex-col gap-1">
                    <span className="text-sm">Username</span>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-48 lg:w-64 outline-none  focus:outline-2 focus:outline-blue-500 p-2 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                        required
                    />
                </label>
                <label htmlFor="password" className="flex flex-col gap-1">
                    <span className="text-sm">Password</span>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-48 lg:w-64 outline-none  focus:outline-2 focus:outline-blue-500 p-2 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                        required
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in">Login</button>
                <p className="mt-4 text-sm">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-rose-500">Register</Link></p>
            </form>
        </div>
    )
}

export default Login;
