import BookingWidget from '../components/BookingWidget';
import { Check, Star, Shield } from 'lucide-react';

export default function Home() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[80vh] min-h-[600px] w-full bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-60">
                    {/* Placeholder for high-quality video or image */}
                    <img
                        src="https://images.unsplash.com/photo-1562911791-c7a97b729ec5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2600&q=80"
                        className="w-full h-full object-cover"
                        alt="Luxury Car"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-20">
                    <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight mb-4">
                        Reliable Chauffeurs.<br />
                        <span className="font-bold">Exceptional Service.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light">
                        Your premium private driver service for airport transfers, hourly bookings, and events.
                    </p>
                </div>
            </div>

            {/* Booking Widget Overlay */}
            <div className="px-4 sm:px-6 lg:px-8">
                <BookingWidget />
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose DriveHire?</h2>
                    <div className="w-16 h-1 bg-black mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-4">
                    <div className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Star className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Professional Chauffeurs</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our drivers are licensed, insured, and rigorously trained to provide the highest level of service and discretion.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Shield className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Fixed Rates</h3>
                        <p className="text-gray-600 leading-relaxed">
                            No hidden costs. The price you see is the price you pay, including all taxes, tolls, and gratuities.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Check className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Free Cancellation</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Change of plans? Cancel your ride for free up to 1 hour before pickup for one-way transfers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Fleet Preview (Static) */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Fleet</h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Choose from our wide range of premium vehicles. Whether you need a Business Class sedan for a meeting or a First Class SUV for a special occasion, we have the perfect car for you.
                            </p>
                            <button className="text-black font-bold border-b-2 border-black pb-1 hover:text-gray-700 hover:border-gray-700 transition-colors">
                                View All Vehicles
                            </button>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Luxury Fleet"
                                className="rounded shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
