import { Link } from 'react-router-dom';
import { Plane, Clock, Map, Shield, Award, Calendar, ChevronRight } from 'lucide-react';

export default function Services() {
    const services = [
        {
            title: "City to City",
            subtitle: "Long Distance Travel",
            icon: Map,
            description: "Seamless travel between cities. Enjoy the comfort of a private car for your long-distance journeys.",
            link: "/services/city-to-city"
        },
        {
            title: "Hourly Service",
            subtitle: "By the Hour",
            icon: Clock,
            description: "Flexible chauffeur service for as long as you need. Perfect for meetings, events, or exploring the city.",
            link: "/services/hourly"
        },
        {
            title: "One Way Transfer",
            subtitle: "A to B",
            icon: ChevronRight,
            description: "Direct transfers from point A to point B. The most efficient way to get to your destination.",
            link: "/services/one-way"
        }
    ];

    return (
        <div className="bg-white">
            <div className="py-24 bg-gray-50 text-center">
                <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">Our Premium Services</h1>
                <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                    Tailored to your needs. Consistent excellence.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {services.map((service) => (
                        <div key={service.title} className="text-center group">
                            <div className="inline-block p-4 bg-black text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                                <service.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                {service.description}
                            </p>
                            <Link to={service.link} className="text-black font-bold uppercase tracking-widest text-sm border-b-2 border-transparent group-hover:border-black transition-colors pb-1">
                                Book Now
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
