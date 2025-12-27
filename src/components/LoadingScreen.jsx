import { useEffect, useState } from 'react';

export default function LoadingScreen({ fullScreen = true, message = null }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Small delay to prevent flash for super fast loads
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center transition-opacity duration-500">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-800 border-t-white rounded-full animate-spin"></div>
                    <div className="mt-8 text-center">
                        <h2 className="text-white text-xl font-bold tracking-[0.2em] animate-pulse">DRIVEHIRE</h2>
                        {message && (
                            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">{message}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
            {message && <span className="text-xs uppercase tracking-widest text-gray-500">{message}</span>}
        </div>
    );
}
