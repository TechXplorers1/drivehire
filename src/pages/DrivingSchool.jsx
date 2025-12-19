import { useState, useEffect } from 'react';
import { Star, Check, Shield, MapPin, Award, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Assets
import SchoolHero from '../assets/school-hero.png';
import CourseBeginner from '../assets/course-beginner.png';
import CourseRefresher from '../assets/course-refresher.png';
// Fallback for defensive if image missing or use icon
import CourseDefensive from '../assets/course-refresher.png'; // Placeholder if needed

export default function DrivingSchool() {
    const [activeTab, setActiveTab] = useState('courses');

    // Mock Data
    const packages = [
        {
            title: "Beginner's License",
            price: 850,
            hours: 20,
            image: CourseBeginner,
            features: ["Theory Test Prep", "20 Hours Behind-the-Wheel", "Mock Driving Test", "Car for Road Test"],
            popular: true
        },
        {
            title: "Refresher Course",
            price: 300,
            hours: 6,
            image: CourseRefresher,
            features: ["Confidence Building", "Highway Driving", "Parking Maneuvers", "Updated Traffic Laws"],
            popular: false
        },
        {
            title: "Defensive Driving",
            price: 450,
            hours: 10,
            image: CourseRefresher, // Using refresher as placeholder or if generic
            features: ["Hazard Perception", "Night Driving", "Bad Weather Handling", "Insurance Discount Cert"],
            popular: false
        }
    ];

    const instructors = [
        {
            name: "Sarah Jenkins",
            rating: "4.9",
            reviews: 124,
            bio: "Specializes in nervous drivers. calm, patient, and thorough.",
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
        },
        {
            name: "David Chen",
            rating: "5.0",
            reviews: 89,
            bio: "Former performance driving instructor. Focuses on precision and safety.",
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
        },
        {
            name: "Maria Rodriguez",
            rating: "4.8",
            reviews: 210,
            bio: "20 years of experience. High pass rate for first-time testers.",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                    src={SchoolHero}
                    alt="Driving Lesson"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Master the Road
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mb-10">
                        Top-rated instruction for a lifetime of safe driving.
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded text-lg transition-transform hover:scale-105">
                        Book Your First Lesson
                    </button>
                </div>
            </div>

            {/* Stats / Trust Banner */}
            <div className="bg-black text-white py-12">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest">Pass Rate</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-orange-500 mb-2">10k+</div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest">Students</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-orange-500 mb-2">ADI</div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest">Certified</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-orange-500 mb-2">New</div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest">Modern Fleet</div>
                    </div>
                </div>
            </div>

            {/* Main Content Tabs */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex justify-center mb-16">
                    <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`px-8 py-3 rounded-md font-medium transition-all ${activeTab === 'courses' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                        >
                            Courses & Pricing
                        </button>
                        <button
                            onClick={() => setActiveTab('instructors')}
                            className={`px-8 py-3 rounded-md font-medium transition-all ${activeTab === 'instructors' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                        >
                            Our Instructors
                        </button>
                    </div>
                </div>

                {activeTab === 'courses' ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {packages.map((pkg, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group bg-white">
                                <div className="h-48 bg-gray-50 p-8 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img src={pkg.image} alt={pkg.title} className="h-32 w-auto object-contain z-10" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                                    <div className="flex items-baseline mb-6">
                                        <span className="text-3xl font-bold">${pkg.price}</span>
                                        <span className="text-gray-500 ml-2">/ {pkg.hours} hrs</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {pkg.features.map((feat, i) => (
                                            <li key={i} className="flex items-center text-gray-600 text-sm">
                                                <Check className="w-4 h-4 text-orange-500 mr-3" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full py-3 border-2 border-black text-black font-bold rounded hover:bg-black hover:text-white transition-colors">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {instructors.map((inst, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-md transition-shadow">
                                <img src={inst.img} alt={inst.name} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-gray-50" />
                                <h3 className="text-xl font-bold mb-1">{inst.name}</h3>
                                <div className="flex items-center justify-center text-orange-500 mb-4">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="ml-1 font-bold text-black">{inst.rating}</span>
                                    <span className="ml-1 text-gray-400 text-sm">({inst.reviews})</span>
                                </div>
                                <p className="text-gray-600 text-sm italic mb-6">"{inst.bio}"</p>
                                <button className="text-orange-500 font-bold text-sm hover:underline">View Schedule</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Safety Section */}
            <div className="bg-gray-50 py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-6">Safety is not accidental</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            We don't just teach you to pass a test; we teach you to survive on modern roads.
                            Our defensive driving curriculum is embedded in every lesson, ensuring you are prepared for the unexpected.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <Shield className="w-8 h-8 text-black mr-4" />
                                <div>
                                    <h4 className="font-bold mb-1">Dual Control</h4>
                                    <p className="text-sm text-gray-500">All vehicles equipped for maximum safety.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Award className="w-8 h-8 text-black mr-4" />
                                <div>
                                    <h4 className="font-bold mb-1">Certified</h4>
                                    <p className="text-sm text-gray-500">Fully licensed ADI instructors only.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="font-bold text-xl mb-6">Student Testimonial</h3>
                            <div className="flex text-orange-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <p className="text-gray-700 italic mb-6">
                                "I was terrified of highway driving. After just 3 lessons with Sarah, I felt completely in control. The focus on safety gave me real confidence."
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">EM</div>
                                <div className="ml-3">
                                    <p className="font-bold text-sm">Emily M.</p>
                                    <p className="text-xs text-gray-400">Passed First Try</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
