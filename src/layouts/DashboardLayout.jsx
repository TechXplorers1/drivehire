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
    Tag
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
                    { name: 'Assignments', icon: Calendar, path: '/driver' },
                    { name: 'My Profile', icon: User, path: '/driver?tab=profile' },
                    { name: 'Earnings', icon: DollarSign, path: '/driver?tab=earnings' },
                ];
            default: // user
                return [
                    { name: 'Rides', icon: Car, path: '/account?tab=rides' },
                    { name: 'Account', icon: User, path: '/account?tab=account' },
                    { name: 'Promotions', icon: Tag, path: '/account?tab=promotions' },
                ];
        }
    };

    const links = getLinks(role);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
                    {/* <span className="text-xl font-bold tracking-tight">DriveExample</span> */}
                {/* <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500"> */}
                {/* <X className="w-6 h-6" /> */}
                {/* </button> */}
                {/* </div> */}

                <div className="p-4">
                    <div className="mb-8 px-2 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                            <p className="text-xs text-gray-500 capitalize">{role}</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {links.map((link) => {
                            const isActive = location.pathname + location.search === link.path || (link.path.includes('?') && location.search.includes(link.path.split('?')[1]));
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive
                                        ? 'bg-black text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <link.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                    <Link to="/" className="mt-2 flex items-center w-full px-4 py-2 text-sm text-gray-500 hover:text-black">
                        ← Back to Home
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500">
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold">Dashboard</span>
                    <div className="w-6" /> {/* Spacer */}
                </div>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
