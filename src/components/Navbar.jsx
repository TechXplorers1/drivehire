import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    console.log("Navbar: Current user state:", user);
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Check if we are on home page or service detail page
    const isTransparentPage = location.pathname === '/' || location.pathname.startsWith('/services/');

    const isScrolledHome = isTransparentPage && scrolled;
    const isFixedHome = isTransparentPage && !scrolled;

    // Base classes that are always present
    const baseButtonClass = "px-5 py-2.5 rounded-sm text-sm font-bold transition-colors";

    // Specific styling based on state
    // On Hero (fixed): White background, Black text
    // On White Navbar (scrolled/other page): Black background, White text
    const buttonColorClass = isFixedHome
        ? "bg-white text-black hover:bg-gray-100"
        : "bg-black text-white hover:bg-gray-800";

    // State for dropdown
    const [showServices, setShowServices] = useState(false);
    const dropdownClass = "absolute top-full left-0 w-48 bg-white shadow-xl py-2 rounded-b-md mt-0 border-t-2 border-black"; // Standard dropdown style

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isFixedHome ? 'bg-transparent text-white' : 'bg-white text-gray-900 shadow-md'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/" className={`text-2xl font-bold tracking-tighter ${isFixedHome ? 'text-white' : 'text-black'}`}>
                            DRIVEHIRE
                        </Link>
                        <div className="hidden md:flex ml-12 space-x-8 items-center h-20">

                            {/* Services Dropdown */}
                            <div
                                className="relative h-full flex items-center"
                                onMouseEnter={() => setShowServices(true)}
                                onMouseLeave={() => setShowServices(false)}
                            >
                                <Link to="/services" className={`text-sm font-medium uppercase tracking-widest py-2 ${isFixedHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'}`}>
                                    Services
                                </Link>
                                {showServices && (
                                    <div className={dropdownClass}>
                                        <Link to="/services/city-to-city" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black">City to City</Link>
                                        <Link to="/services/hourly" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black">Hourly</Link>
                                        <Link to="/services/one-way" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black">One Way</Link>
                                    </div>
                                )}
                            </div>

                            <Link to="/fleet" className={`text-sm font-medium uppercase tracking-widest ${isFixedHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'}`}>Fleet</Link>
                            <Link to="/school" className={`text-sm font-medium uppercase tracking-widest ${isFixedHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'}`}>Driving School</Link>
                            <Link to="/business" className={`text-sm font-medium uppercase tracking-widest ${isFixedHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'}`}>For Business</Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        {user ? (
                            <>
                                <Link to="/account" className={isFixedHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'}>
                                    <User className="w-6 h-6" />
                                </Link>
                                <button onClick={handleLogout} className={isFixedHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'}>
                                    <LogOut className="w-6 h-6" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={`text-sm font-bold ${isFixedHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'}`}>LOG IN</Link>
                                <Link to="/register" className={`${baseButtonClass} ${buttonColorClass}`}>
                                    SIGN UP
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
