import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    LayoutDashboard,
    Calendar,
    User,
    Settings,
    LogOut,
    Menu,
    X,
    Car,
    Users,
    DollarSign,
    Shield,
    Tag,
    MapPin,
    Clock
} from 'lucide-react';

export default function DashboardLayout({ children, role }) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const getLinks = (role) => {
        switch (role) {
            case 'admin':
                return [
                    { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
                    { name: 'Users', icon: Users, path: '/admin?tab=users' },
                    { name: 'Drivers', icon: Car, path: '/admin?tab=drivers' },
                    { name: 'Settings', icon: Settings, path: '/admin?tab=settings' },
                ];
            case 'driver':
                return [
                    { name: 'Requests', icon: MapPin, path: '/driver' },
                    { name: 'Schedule', icon: Calendar, path: '/driver?tab=upcoming' },
                    { name: 'History', icon: Clock, path: '/driver?tab=history' },
                    { name: 'Earnings', icon: DollarSign, path: '/driver?tab=earnings' },
                    { name: 'My Profile', icon: User, path: '/driver?tab=profile' },
                ];
            default: // user
                return [
                    { name: 'Rides', icon: Car, path: '/account?tab=rides' },
                    { name: 'Lessons', icon: Calendar, path: '/account?tab=lessons' },
                    { name: 'Account', icon: User, path: '/account?tab=account' },
                    { name: 'Promotions', icon: Tag, path: '/account?tab=promotions' },
                ];
        }
    };

    const links = getLinks(role);

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
                <div className="flex items-center justify-between h-20 px-6 bg-slate-950/50">
                    <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Car className="w-8 h-8 text-indigo-500" />
                        <span>DRIVE<span className="text-indigo-500">HIRE</span></span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
                    <div className="mb-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                            <p className="text-xs text-indigo-400 font-medium capitalize tracking-wide">{role}</p>
                        </div>
                    </div>

                    <nav className="space-y-1.5">
                        {links.map((link) => {
                            const isActive = location.pathname + location.search === link.path || (link.path.includes('?') && location.search.includes(link.path.split('?')[1]));
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center px-4 py-3.5 text-sm font-medium rounded-lg transition-all duration-200 group ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <link.icon className={`mr-3 h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-900">
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-950/30 hover:text-red-300 transition-colors duration-200"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                    {/* <Link to="/" className="mt-3 flex items-center justify-center w-full px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider">
                        Back to Home
                    </Link> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50/50">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-gray-900 text-lg">Dashboard</span>
                    <div className="w-8" /> {/* Spacer */}
                </div>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6 sm:p-10">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
