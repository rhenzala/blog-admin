import { useState } from "react";
import { register } from "../utils/api";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await register(username, email, password);
            setSuccess("Registration successful! You can now login.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={handleRegister} className="bg-zinc-300 dark:bg-zinc-700 py-12 px-8 rounded-lg flex flex-col gap-4 w-fit">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
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
                <label htmlFor="email" className="flex flex-col gap-1">
                    <span className="text-sm">Email</span>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in">Register</button>
                <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-blue-500 hover:text-rose-500">Login</Link></p>
            </form>
        </div>
    )
}

export default Register;
