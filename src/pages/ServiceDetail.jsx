import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Check,
    Clock,
    MapPin,
    Shield,
    Star,
    Smartphone,
    ChevronDown,
    ArrowRight,
    Globe,
    Plane
} from 'lucide-react';

// Asset imports
import CityHero from '../assets/city-hero.png';
import HourlyHero from '../assets/hourly-hero.png';
import OneWayHero from '../assets/oneway-hero.png';
import GlobalMap from '../assets/global-map.png';
import BookingWidget from '../components/BookingWidget';

const serviceData = {
    'city-to-city': {
        title: 'City-to-City Long Distance Car Service',
        subtitle: 'Your stress-free alternative to flights and trains.',
        heroImage: CityHero,
        heroAlt: 'Luxury car on highway at sunset',
        intro: {
            title: 'Travel in comfort and style',
            description: 'Skip the stress of airports and train stations. Our city-to-city service offers a private, comfortable, and reliable way to travel long distances.',
            features: [
                { icon: Shield, title: 'Safety First', text: 'Professional, vetted chauffeurs and premium vehicles.' },
                { icon: Clock, title: 'On Your Schedule', text: 'Depart exactly when you want, door-to-door service.' },
                { icon: Star, title: 'Premium Experience', text: 'Complimentary Wi-Fi, water, and chargers onboard.' }
            ]
        },
        sections: [
            {
                title: 'Long distance car service, the better way between cities',
                content: `Imagine avoiding the lines, security checks, and baggage claims of airports. With our City-to-City service, your journey begins safely at your front door and ends right at your destination. 
        
        Whether for business or leisure, maximize your time by working in a quiet environment or simply relaxing in the comfort of a top-class vehicle. It's not just a ride; it's an experience designed around your needs.`,
                imageSide: 'right'
            },
            {
                title: 'Global reach, local expertise',
                content: `Our network spans across major cities worldwide, ensuring that wherever your travels take you, a familiar, high-standard service awaits. We combine global reliability with local knowledge to provide the most efficient routes.`,
                image: GlobalMap,
                imageSide: 'left'
            }
        ],
        faqs: [
            { q: 'How far can I travel with City-to-City service?', a: 'We cover most major routes between cities. Contact us for specific long-distance inquiries.' },
            { q: 'Is it cheaper than flying?', a: 'For groups or when factoring in travel to/from airports, parking, and time saved, it is often comparable and offers superior value.' },
            { q: 'Can I make stops along the way?', a: 'Yes, you can request stops. Additional charges may apply depending on the duration.' }
        ]
    },
    'hourly': {
        title: 'By the Hour Chauffeur Service',
        subtitle: 'Flexible, premium transportation on your terms.',
        heroImage: HourlyHero,
        heroAlt: 'Chauffeur opening car door',
        intro: {
            title: 'Total Flexibility for Your Day',
            description: 'Perfect for roadshows, multiple meetings, or a day of shopping. Keep your chauffeur for as long as you need.',
            features: [
                { icon: Clock, title: 'As Long as You Need', text: 'Book by the hour with a dedicated chauffeur.' },
                { icon: MapPin, title: 'Unlimited Stops', text: 'Go wherever you need, whenever you are ready.' },
                { icon: Shield, title: 'Wait & Return', text: 'Your car stays with you, ready to go instantly.' }
            ]
        },
        sections: [
            {
                title: 'A chauffeur at your disposal',
                content: `Need to attend back-to-back meetings? Or perhaps you're exploring a new city and want the freedom to change your plans on the fly.
        
        Our hourly service gives you a private chauffeur who waits for you between stops. No re-booking, no waiting for a new ride. It is the ultimate convenience for busy schedules.`,
                imageSide: 'right'
            }
        ],
        faqs: [
            { q: 'What is the minimum booking time?', a: 'The minimum booking duration is typically 2 hours, varying by city.' },
            { q: 'Can I extend my booking?', a: 'Yes, you can extend your booking on the go, subject to chauffeur availability.' }
        ]
    },
    'one-way': {
        title: 'One Way & Airport Transfers',
        subtitle: 'Seamless connections from A to B.',
        heroImage: OneWayHero,
        heroAlt: 'Luxury car at airport',
        intro: {
            title: 'Reliable A to B Transfers',
            description: 'The standard for airport transfers and point-to-point journeys. Honest pricing, reliable service.',
            features: [
                { icon: Plane, title: 'Airport Specialist', text: 'Flight tracking and 60 minutes free wait time.' }, // Note: Need Plane icon or similar
                { icon: Check, title: 'Fixed Rates', text: 'All-inclusive pricing confirmed before you book.' },
                { icon: Star, title: 'Meet & Greet', text: ' personalised pickup service at arrivals.' }
            ]
        },
        sections: [
            {
                title: 'Start your trip right',
                content: `There’s no better feeling than seeing your professional chauffeur waiting for you after a long flight. Let us handle your luggage and navigate the traffic while you relax.
        
        Our one-way transfer service is perfect for airport runs, dinner reservations, or getting to your hotel in style.`,
                imageSide: 'right'
            }
        ],
        faqs: [
            { q: 'What happens if my flight is delayed?', a: 'We track all flights. Your pickup time is automatically adjusted, and your chauffeur will be there when you land.' },
            { q: 'How do I find my driver?', a: 'Your driver will be waiting in the arrivals hall with a name sign.' }
        ]
    }
};




const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex justify-between items-center w-full text-left font-medium text-gray-900 hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <p className="py-2">{answer}</p>
            </div>
        </div>
    );
};

const ServiceDetail = ({ type }) => {
    const params = useParams();
    // Allow passing type via prop (from App.jsx) or fallback to generic if we used dynamic routing (not used yet)
    const serviceType = type || 'city-to-city';
    const data = serviceData[type];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    if (!data) return <div>Service not found</div>;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src={data.heroImage}
                    alt={data.heroAlt}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[20s]"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-24">
                    <div className="max-w-4xl pt-20">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            {data.title}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl font-light">
                            {data.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            {/* Booking Widget */}
            <div className="px-4 md:px-12 lg:px-24">
                <BookingWidget
                    key={type}
                    initialType={
                        type === 'city-to-city' ? 'city_to_city' :
                            type === 'hourly' ? 'hourly' : 'oneway'
                    }
                />
            </div>

            {/* Intro Features */}
            <div className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.intro.title}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{data.intro.description}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {data.intro.features.map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-500">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Sections (Zig-Zag) */}
            <div className="py-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto space-y-24">
                    {data.sections.map((section, idx) => (
                        <div key={idx} className={`flex flex-col ${section.imageSide === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                            <div className="flex-1 space-y-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{section.title}</h2>
                                <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </div>
                                {section.imageSide === 'left' && (
                                    <button className="text-orange-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-4">
                                        View destinations <ArrowRight size={20} />
                                    </button>
                                )}
                            </div>
                            <div className="flex-1 w-full">
                                {section.image ? (
                                    <img src={section.image} alt={section.title} className="w-full rounded-lg shadow-lg" />
                                ) : (
                                    /* Design-only placeholder for the standard sections if no specific image provided */
                                    <div className="aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-300 to-gray-100" />
                                        {/* Stylized typographic representation for visual interest */}
                                        <div className="relative z-10 text-9xl font-black text-white/50 select-none">
                                            {type === 'city-to-city' ? 'A → B' : type === 'hourly' ? '24h' : 'GO'}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-20 px-6 md:px-12 lg:px-24 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10">Frequently asked questions</h2>
                    <div className="divide-y divide-gray-100">
                        {data.faqs.map((faq, idx) => (
                            <FAQItem key={idx} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </div>

            {/* App Download / CTA Section */}
            <div className="py-24 bg-black text-white px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1">
                        <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-medium mb-6">
                            Mobile App
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Travel on the go</h2>
                        <p className="text-xl text-gray-400 mb-8 max-w-lg">
                            Book, track, and manage your rides from anywhere with our premium mobile application.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-white text-black px-6 py-3 rounded font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                                <Smartphone size={20} /> App Store
                            </button>
                            <button className="border border-white/30 text-white px-6 py-3 rounded font-bold flex items-center gap-2 hover:bg-white/10 transition-colors">
                                <Globe size={20} /> Google Play
                            </button>
                        </div>
                    </div>
                    {/* Phone Mockup Placeholder */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="w-64 h-[500px] border-8 border-gray-800 rounded-[3rem] bg-gray-900 relative shadow-2xl overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20" />
                            <div className="w-full h-full bg-white flex flex-col">
                                {/* Mock App Screen */}
                                <div className="h-1/2 bg-slate-900 flex items-center justify-center text-white p-6 text-center">
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">DriveHire</h3>
                                        <p className="text-sm opacity-70">Your private driver</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="h-2 bg-gray-100 w-full mb-4 rounded" />
                                    <div className="h-2 bg-gray-100 w-2/3 mb-4 rounded" />
                                    <div className="mt-8">
                                        <div className="h-12 bg-black rounded w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ServiceDetail;
