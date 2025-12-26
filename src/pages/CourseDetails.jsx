import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Shield, Award, Calendar, ChevronDown, UserCheck } from 'lucide-react';
import { useState } from 'react';

// Assets (reusing from existing)
import CourseRefresher from '../assets/course-refresher.png';

export default function CourseDetails() {
    const { id } = useParams();
    const [openWeek, setOpenWeek] = useState(0);

    // Mock Data based on ID
    const course = {
        title: "Beginner's License Package",
        price: 850,
        hours: 20,
        level: "Beginner",
        image: CourseRefresher, // Placeholder
        description: "A comprehensive 20-hour program designed to take you from a complete novice to a confident, road-ready driver. This course covers everything from basic vehicle controls to complex traffic situations, ensuring you are fully prepared for your practical driving test.",
        features: ["Theory Test Prep", "20 Hours Behind-the-Wheel", "Mock Driving Test", "Car for Road Test", "Pick-up & Drop-off"],
        requirements: ["Valid Provisional License", "Age 17+", " eyesight checks"],
        curriculum: [
            { title: "Week 1: Vehicle Basics & Control", content: "Understanding the cockpit drill, moving off and stopping safely, steering techniques, and basic maneuvering." },
            { title: "Week 2: Junctions & Roundabouts", content: "Approaching junctions, observation rules (MSM routine), dealing with different types of roundabouts." },
            { title: "Week 3: Road Procedures & Hazards", content: "Meeting traffic, pedestrian crossings, hazard perception, and anticipation skills." },
            { title: "Week 4: Reversing Maneuvers", content: "Parallel parking, bay parking, pulling up on the right, and emergency stops." },
            { title: "Week 5: Faster Roads & Test Prep", content: "Dual carriageways, rural roads, independent driving, and a full mock practical test." }
        ]
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/school" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Courses
                </Link>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">
                                {course.level} Level
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{course.title}</h1>
                            <p className="text-xl text-gray-600 leading-relaxed">{course.description}</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <Clock className="w-5 h-5 text-gray-400 mb-2" />
                                <div className="font-bold text-gray-900">{course.hours} Hours</div>
                                <div className="text-xs text-gray-500">Duration</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <Shield className="w-5 h-5 text-gray-400 mb-2" />
                                <div className="font-bold text-gray-900">Certified</div>
                                <div className="text-xs text-gray-500">Training</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <Award className="w-5 h-5 text-gray-400 mb-2" />
                                <div className="font-bold text-gray-900">Cert.</div>
                                <div className="text-xs text-gray-500">On Completion</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <Calendar className="w-5 h-5 text-gray-400 mb-2" />
                                <div className="font-bold text-gray-900">Flexible</div>
                                <div className="text-xs text-gray-500">Schedule</div>
                            </div>
                        </div>

                        {/* Curriculum Accordion */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                        <div className="space-y-4 mb-12">
                            {course.curriculum.map((week, idx) => (
                                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setOpenWeek(openWeek === idx ? -1 : idx)}
                                        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-bold text-gray-900">{week.title}</span>
                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openWeek === idx ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openWeek === idx && (
                                        <div className="p-5 pt-0 bg-gray-50 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                                            {week.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Requirements */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {course.requirements.map((req, i) => (
                                <li key={i} className="flex items-center text-gray-700 bg-white border border-gray-100 p-3 rounded-lg shadow-sm">
                                    <UserCheck className="w-5 h-5 text-green-500 mr-3" />
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sidebar / Sticky Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white border border-gray-200 rounded-3xl p-6 shadow-xl">
                            <div className="flex items-baseline mb-2">
                                <span className="text-4xl font-bold text-gray-900">${course.price}</span>
                                <span className="text-gray-500 ml-2">/ package</span>
                            </div>
                            <div className="text-green-600 text-sm font-bold mb-6">Save $100 compared to hourly</div>

                            <div className="space-y-4 mb-8">
                                {course.features.map((feat, i) => (
                                    <div key={i} className="flex items-start text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-orange-500 mr-3 mt-0.5" />
                                        {feat}
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/school/book"
                                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-4 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all mb-4"
                            >
                                Enroll Now
                            </Link>

                            <p className="text-xs text-center text-gray-400">
                                Secure payment via Stripe. <br />
                                100% money-back guarantee for first lesson.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
