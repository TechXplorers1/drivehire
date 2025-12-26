import { useParams, Link } from 'react-router-dom';
import { Star, Shield, Award, MapPin, Calendar, Clock, Check, Car, MessageCircle, ArrowLeft } from 'lucide-react';

export default function InstructorProfile() {
    const { id } = useParams();

    // Mock Data (Static for now, would be fetched by ID in real app)
    const instructor = {
        id: id || '1',
        name: "Sarah Jenkins",
        role: "Senior Instructor",
        rating: 4.9,
        reviews: 124,
        passRate: "98%",
        experience: "15 Years",
        location: "New York, NY",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        bio: "Hi, I'm Sarah! I specialize in helping nervous drivers build confidence behind the wheel. My teaching style is calm, patient, and tailored to each student's learning pace. I believe that safety comes from understanding, not just following rules. I've helped over 1,000 students pass their test, many on their first try.",
        languages: ["English", "Spanish"],
        certifications: ["ADI Certified", "Defensive Driving Specialist", "Nervous Driver Coach"],
        vehicle: {
            model: "2024 Volkswagen Golf GTI",
            image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
            features: ["Dual Controls", "Automatic Transmission", "Lane Assist", "Blind Spot Monitoring"]
        },
        reviewsList: [
            { user: "Emily M.", rating: 5, date: "2 weeks ago", text: "Sarah is amazing! I was terrified of highway driving, but she made me feel safe and competent. Passed my test last week!" },
            { user: "James K.", rating: 5, date: "1 month ago", text: "Very patient and clear instructions. Highly recommend for anyone starting from scratch." }
        ],
        schedule: [
            { day: "Mon", slots: ["09:00", "11:00", "14:00"] },
            { day: "Tue", slots: ["10:00", "13:00", "15:00"] },
            { day: "Wed", slots: ["09:00", "11:00", "16:00"] },
            { day: "Thu", slots: ["Fully Booked"] },
            { day: "Fri", slots: ["09:00", "11:00"] },
        ]
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/school" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Driving School
                </Link>

                {/* Hero Profile Header */}
                <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                    <div className="w-full md:w-1/3">
                        <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl">
                            <img src={instructor.img} alt={instructor.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                                <div className="inline-flex items-center bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                                    {instructor.role}
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-1">{instructor.name}</h1>
                                <div className="flex items-center text-white/90">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {instructor.location}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl text-center">
                                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span className="text-2xl font-bold text-gray-900">{instructor.rating}</span>
                                </div>
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{instructor.reviews} Reviews</div>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl text-center">
                                <div className="text-2xl font-bold text-gray-900 mb-1">{instructor.passRate}</div>
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pass Rate</div>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl text-center">
                                <div className="text-2xl font-bold text-gray-900 mb-1">{instructor.experience}</div>
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Experience</div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">{instructor.bio}</p>
                        </div>

                        {/* Certifications & Languages */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-orange-500" />
                                    Certifications
                                </h3>
                                <ul className="space-y-2">
                                    {instructor.certifications.map((cert, i) => (
                                        <li key={i} className="flex items-center text-gray-600 text-sm">
                                            <Check className="w-4 h-4 text-green-500 mr-2" />
                                            {cert}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5 text-orange-500" />
                                    Languages Spoken
                                </h3>
                                <div className="flex gap-2">
                                    {instructor.languages.map((lang, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Link
                                to={`/school/book?instructor=${instructor.id}`}
                                className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
                            >
                                Book a Lesson
                            </Link>
                            <button className="px-8 py-4 border-2 border-gray-200 font-bold rounded-xl hover:border-gray-900 transition-all">
                                Contact
                            </button>
                        </div>
                    </div>
                </div>

                {/* Training Vehicle Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Car className="w-6 h-6 text-orange-500" />
                        Training Vehicle
                    </h2>
                    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <div className="grid md:grid-cols-2">
                            <div className="h-64 md:h-auto relative">
                                <img src={instructor.vehicle.image} alt={instructor.vehicle.model} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{instructor.vehicle.model}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {instructor.vehicle.features.map((feat, i) => (
                                        <div key={i} className="flex items-center text-gray-600 text-sm">
                                            <Shield className="w-4 h-4 text-orange-500 mr-2" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mock Schedule Preview */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-orange-500" />
                        Availability Preview
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {instructor.schedule.map((day, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl p-4 text-center">
                                <div className="font-bold text-gray-900 mb-3">{day.day}</div>
                                <div className="space-y-2">
                                    {day.slots.map((slot, idx) => (
                                        <div key={idx} className={`text-xs py-1.5 px-2 rounded-lg font-medium ${slot === 'Fully Booked' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-700'}`}>
                                            {slot}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
