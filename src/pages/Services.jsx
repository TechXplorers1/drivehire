import { Link } from 'react-router-dom';
import { Plane, Clock, Map, ChevronRight, ArrowRight } from 'lucide-react';
import globalMap from '../assets/global-map.png';
import cityHero from '../assets/city-hero.png';
import hourlyHero from '../assets/hourly-hero.png';
import onewayHero from '../assets/oneway-hero.png';

export default function Services() {
    const services = [
        {
            title: "City to City",
            subtitle: "Seamless Intercity Travel",
            icon: Map,
            image: cityHero,
            description: "Experience the comfort of a private chauffeur for your long-distance journeys. Direct, stress-free travel between cities.",
            link: "/services/city-to-city"
        },
        {
            title: "Hourly Service",
            subtitle: "Flexible & On-Demand",
            icon: Clock,
            image: hourlyHero,
            description: "Your personal chauffeur for as long as you need. Perfect for meetings, events, or a customized tour of the city.",
            link: "/services/hourly"
        },
        {
            title: "One Way Transfer",
            subtitle: "Efficient A to B Travel",
            icon: Plane, // Using plane as it's often airport/transfer related
            image: onewayHero,
            description: "The most efficient way to get to your destination. Direct transfers from any pickup point to your drop-off.",
            link: "/services/one-way"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-black overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={globalMap}
                        alt="Global Coverage"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                        World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Services</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light">
                        Experience the ultimate in luxury, comfort, and reliability. Tailored solutions for every journey.
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={service.title} className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="mb-auto opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4">
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">{service.subtitle}</span>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">{service.title}</h3>

                                <p className="text-gray-300 mb-8 leading-relaxed opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                                    {service.description}
                                </p>

                                <Link
                                    to={service.link}
                                    className="inline-flex items-center gap-2 text-white font-bold tracking-wide group/btn"
                                >
                                    <span className="border-b-2 border-indigo-500 pb-1 group-hover/btn:border-white transition-colors">BOOK SERVICE</span>
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Info Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose DriveHire?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16">We set the standard for luxury transportation with professional chauffeurs and a premium fleet.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                                <Clock className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Punctuality</h3>
                            <p className="text-gray-500 text-sm">We value your time. Our chauffeurs are always prompt and ready when you are.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                                <Map className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Expert Navigation</h3>
                            <p className="text-gray-500 text-sm">Our drivers know the best routes to get you to your destination efficiently.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                                <Plane className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Global Standards</h3>
                            <p className="text-gray-500 text-sm">Consistent, high-quality service no matter which city you are traveling in.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
