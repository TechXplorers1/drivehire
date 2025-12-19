import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
    const location = useLocation();
    const isTransparentPage = location.pathname === '/' || location.pathname.startsWith('/services/');

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className={`${isTransparentPage ? '' : 'pt-20'} mx-auto flex-grow w-full`}>
                <Outlet />
            </main>
            <footer className="bg-black text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">DRIVEHIRE</h3>
                        <p className="text-gray-400 text-sm">Experience the difference.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Press</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Chauffeur Service</li>
                            <li>Airport Transfer</li>
                            <li>Driving School</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs mt-8">© 2024 DriveHire Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
