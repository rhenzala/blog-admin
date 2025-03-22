import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/api";
import { LogOut } from 'lucide-react';

const Header = ({user, setUser}) => {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            localStorage.removeItem("user");  
            setUser(null);  
            navigate("/login");  
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    return (
        <header className="flex justify-between items-center px-2 md:px-[5%] lg:px-[10%] 2xl:px-[20%] h-16">
            <Link to="/">
                <div className="text-2xl font-bold text-blue-500 flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    <span>MiniBlog</span>
                </div>
            </Link>
            <nav className="flex gap-2">
                {user ? 
                    <button 
                        className="bg-transparent text-zinc-700 dark:text-zinc-100 hover:text-rose-500 transition duration-300 rounded-md px-4 py-2 hover:cursor-pointer"
                        title="Logout"
                        aria-label="Logout"
                        onClick={handleLogout}
                    >
                        <LogOut size={16}/>
                    </button>
                : ""
                }
            </nav>
        </header>
    );
};

export default Header;
