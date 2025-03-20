import { useNavigate } from "react-router-dom";
import { logout } from "../utils/api";
import { LogOut } from 'lucide-react';

const Header = ({admin, setAdmin}) => {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            localStorage.removeItem("admin");  
            setAdmin(null);  
            navigate("/login");  
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    return (
        <header className="flex justify-between items-center px-4 md:px-[10%] lg:px-[20%] h-16">
            <div className="text-2xl font-bold">
                <span>MiniBlog</span>
            </div>
            <nav className="flex gap-2">
                {admin ? 
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
