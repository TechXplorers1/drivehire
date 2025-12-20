import { User, Briefcase, Wifi, Check, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import cityHero from '../assets/city-hero.png';

export default function Fleet() {
    const vehicles = [
        {
            name: "Business Class",
            models: "Mercedes-Benz E-Class, BMW 5 Series, Cadillac XTS",
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            passengers: 3,
            luggage: 2,
            description: "The seamless combination of comfort and efficiency. Perfect for business travel and airport transfers."
        },
        {
            name: "Business Van/SUV",
            models: "Mercedes-Benz V-Class, Chevrolet Suburban, Cadillac Escalade",
            image: "https://images.unsplash.com/photo-1605218427368-35b8dd78d8e6?q=80&w=2000&auto=format&fit=crop",
            passengers: 5,
            luggage: 5,
            description: "More room for your team or family. Enjoy spacious comfort with ample luggage capacity."
        },
        {
            name: "First Class",
            models: "Mercedes-Benz S-Class, BMW 7 Series, Audi A8",
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            passengers: 3,
            luggage: 2,
            description: "The ultimate in luxury and style. Arrive in a top-of-the-range vehicle with a highly experienced chauffeur."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={cityHero}
                        alt="Fleet Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Premium Fleet</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light">
                        Excellence in motion. Choose from our meticulously maintained selection of luxury vehicles.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-20 relative z-10">
                <div className="space-y-12">
                    {vehicles.map((car, idx) => (
                        <div key={car.name} className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Image Section */}
                                <div className={`md:w-1/2 relative overflow-hidden h-64 md:h-auto ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-3xl font-bold text-gray-900">{car.name}</h2>
                                        <div className="h-px flex-grow bg-gray-200" />
                                    </div>

                                    <p className="text-gray-500 mb-6 leading-relaxed">
                                        {car.description}
                                    </p>

                                    <div className="bg-gray-50 rounded-xl p-4 mb-8">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Models</p>
                                        <p className="text-sm font-medium text-gray-900">{car.models}</p>
                                    </div>

                                    <div className="flex gap-6 mb-8 text-sm font-medium text-gray-600">
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                                            <User className="w-4 h-4" />
                                            <span>Max. {car.passengers}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                                            <Briefcase className="w-4 h-4" />
                                            <span>Max. {car.luggage}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                                            <Wifi className="w-4 h-4" />
                                            <span>Free Wifi</span>
                                        </div>
                                    </div>

                                    <Link
                                        to="/search"
                                        className="inline-flex items-center justify-center w-full md:w-auto bg-black text-white px-8 py-4 font-bold rounded-xl hover:bg-gray-800 transition-all group-hover:gap-2"
                                    >
                                        <span>Book {car.name}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
