import { useState, useEffect } from 'react';
import { Star, Check, Shield, MapPin, Award, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
// Assets
import SchoolHero from '../assets/school-hero.png';
import CourseBeginner from '../assets/course-beginner.png';
import CourseRefresher from '../assets/course-refresher.png';

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
            image: CourseRefresher,
            features: ["Hazard Perception", "Night Driving", "Bad Weather Handling", "Insurance Discount Cert"],
            popular: false
        }
    ];

    const instructors = [
        {
            name: "Sarah Jenkins",
            rating: "4.9",
            reviews: 124,
            bio: "Specializes in nervous drivers. Calm, patient, and thorough.",
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
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={SchoolHero}
                        alt="Driving School"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                </div>
                <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
                    <div className="max-w-2xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4 border border-orange-500/30">
                            Driving Academy
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Master the <br /> <span className="text-orange-500">Road</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                            Top-rated instruction for a lifetime of safe driving. Join thousands of successful students who passed with DriveHire.
                        </p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-2 w-fit">
                            Book Your First Lesson
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats / Trust Banner */}
            <div className="bg-neutral-900 border-y border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { val: "98%", label: "Pass Rate" },
                        { val: "10k+", label: "Students" },
                        { val: "ADI", label: "Certified" },
                        { val: "2024", label: "Modern Fleet" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center md:text-left md:pl-8 border-l border-neutral-800 first:border-l-0">
                            <div className="text-4xl font-bold text-white mb-1">{stat.val}</div>
                            <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Tabs */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex justify-center mb-16">
                    <div className="flex bg-gray-100 p-1.5 rounded-xl">
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`px-8 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'courses' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-black'}`}
                        >
                            Courses & Pricing
                        </button>
                        <button
                            onClick={() => setActiveTab('instructors')}
                            className={`px-8 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'instructors' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-black'}`}
                        >
                            Our Instructors
                        </button>
                    </div>
                </div>

                {activeTab === 'courses' ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {packages.map((pkg, idx) => (
                            <div key={idx} className={`relative group bg-white rounded-3xl overflow-hidden border ${pkg.popular ? 'border-orange-200 ring-4 ring-orange-500/5 shadow-xl' : 'border-gray-100 shadow-sm hover:shadow-xl'} transition-all duration-300`}>
                                {pkg.popular && (
                                    <div className="absolute top-4 right-4 z-20 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        POPULAR
                                    </div>
                                )}
                                <div className="h-56 bg-gray-100 relative overflow-hidden group-hover:opacity-90 transition-opacity cursor-pointer">
                                    <Link to={`/school/course/${idx + 1}`} className="absolute inset-0 z-30" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                                        <span className="text-white/80 text-xs font-bold uppercase tracking-wider mt-1 block">View Details</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-baseline mb-6">
                                        <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                                        <span className="text-gray-500 ml-2 font-medium">/ {pkg.hours} hrs</span>
                                    </div>
                                    <ul className="space-y-4 mb-8">
                                        {pkg.features.map((feat, i) => (
                                            <li key={i} className="flex items-start text-gray-600 text-sm font-medium">
                                                <div className="mt-0.5 mr-3 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-orange-600" />
                                                </div>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        to={`/school/book?package=${idx === 0 ? 'beginner' : idx === 1 ? 'refresher' : 'defensive'}`}
                                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all flex justify-center items-center gap-2 group/btn"
                                    >
                                        Enroll Now
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {instructors.map((inst, idx) => (
                            <Link to={`/school/instructor/${idx + 1}`} key={idx} className="bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-xl transition-shadow group text-center block">
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-orange-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300" />
                                    <img src={inst.img} alt={inst.name} className="w-full h-full rounded-full object-cover relative z-10 border-4 border-white shadow-sm" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{inst.name}</h3>
                                <div className="flex items-center justify-center gap-1 mb-4">
                                    <Star className="w-4 h-4 text-orange-500 fill-current" />
                                    <span className="font-bold text-gray-900">{inst.rating}</span>
                                    <span className="text-gray-400 text-sm">({inst.reviews} reviews)</span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">"{inst.bio}"</p>
                                <span className="text-orange-600 font-bold text-sm tracking-wide uppercase hover:text-orange-700 transition-colors">View Profile & Schedule</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Safety Section */}
            <div className="bg-gray-50 py-24 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Safety is not accidental</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                We don't just teach you to pass a test; we teach you to survive on modern roads.
                                Our defensive driving curriculum is embedded in every lesson, ensuring you are prepared for the unexpected.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mr-4 flex-shrink-0">
                                        <Shield className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Dual Control Vehicles</h4>
                                        <p className="text-gray-500">All vehicles equipped with advanced safety systems and dual controls.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mr-4 flex-shrink-0">
                                        <Award className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Certified Instructors</h4>
                                        <p className="text-gray-500">Fully licensed ADI instructors with background checks and rigorous training.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative">
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg transform rotate-12">
                                    <span className="text-center text-xs leading-tight">Student<br />Choice</span>
                                </div>
                                <div className="flex text-orange-500 mb-6 gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-xl text-gray-800 italic mb-8 font-medium">
                                    "I was terrified of highway driving. After just 3 lessons with Sarah, I felt completely in control. The focus on safety gave me real confidence."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 text-lg">EM</div>
                                    <div className="ml-4">
                                        <p className="font-bold text-gray-900">Emily M.</p>
                                        <p className="text-sm text-gray-500">Passed First Try</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
