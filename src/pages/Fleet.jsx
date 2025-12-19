import { User, Briefcase, Wifi, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Fleet() {
    const vehicles = [
        {
            name: "Business Class",
            models: "Mercedes-Benz E-Class, BMW 5 Series, Cadillac XTS",
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            passengers: 3,
            luggage: 2,
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
        <div className="bg-white">
            {/* Hero */}
            <div className="relative py-24 bg-black text-white text-center">
                <h1 className="text-4xl font-light tracking-tight sm:text-5xl">Our Fleet</h1>
                <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
                    A vehicle for every occasion. Uniform standards, everywhere.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-24">
                    {vehicles.map((car, idx) => (
                        <div key={car.name} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1 w-full">
                                <img src={car.image} alt={car.name} className="w-full h-auto rounded shadow-lg" />
                            </div>
                            <div className="flex-1 w-full">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">{car.name}</h2>
                                <p className="text-lg text-gray-500 mb-6">{car.description}</p>
                                <p className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wider">Models: {car.models}</p>

                                <div className="flex space-x-6 mb-8 text-gray-500 text-sm">
                                    <span className="flex items-center"><User className="w-4 h-4 mr-2" /> Max. {car.passengers}</span>
                                    <span className="flex items-center"><Briefcase className="w-4 h-4 mr-2" /> Max. {car.luggage}</span>
                                    <span className="flex items-center"><Wifi className="w-4 h-4 mr-2" /> Free Wifi</span>
                                </div>

                                <Link to="/search" className="inline-block bg-black text-white px-8 py-3 font-bold rounded-sm hover:bg-gray-800 transition-colors">
                                    Book {car.name}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
