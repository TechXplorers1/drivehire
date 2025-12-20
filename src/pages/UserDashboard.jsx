import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserBookings } from '../lib/db';
import DashboardLayout from '../layouts/DashboardLayout';
import { Calendar, Clock, MapPin, Tag, Car, Settings, User } from 'lucide-react';

export default function UserDashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    // Default to 'rides'
    const tab = searchParams.get('tab') || 'rides';

    const [profileData, setProfileData] = useState({
        fullName: '',
        phone: ''
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                fullName: user.fullName || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    useEffect(() => {
        async function load() {
            if (user) {
                const data = await getUserBookings(user.uid);
                setBookings(data.sort((a, b) => b.createdAt - a.createdAt));
                setLoading(false);
            }
        }
        load();
    }, [user]);

    return (
        <DashboardLayout role="user">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-light text-gray-900 mb-8 capitalize tracking-tight">
                    {tab === 'rides' && 'Your Rides'}
                    {tab === 'lessons' && 'Driving Lessons'}
                    {tab === 'account' && 'Account Settings'}
                    {tab === 'promotions' && 'Promotions'}
                </h1>

                {tab === 'rides' && (
                    <div className="space-y-6">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
                                <span className="text-gray-500 uppercase tracking-widest text-xs">Loading rides...</span>
                            </div>
                        ) : bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <div key={booking.id} className="group bg-white rounded-none border-l-4 border-black shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-3">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${booking.paymentStatus === 'paid' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
                                                    {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                                                </span>
                                                <span className="text-sm text-gray-500 font-medium flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {booking.date}
                                                </span>
                                                <span className="text-sm text-gray-500 font-medium flex items-center">
                                                    <Clock className="w-4 h-4 mr-2" />
                                                    {booking.time}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">
                                                {booking.serviceType === 'chauffeur' ? `Chauffeur • ${booking.driverName}` : 'Driving Lesson'}
                                            </h3>
                                            <div className="flex items-center text-sm text-gray-500 gap-6">
                                                <span>Duration: {booking.duration} hrs</span>
                                                <span className="font-semibold text-black text-lg">${booking.totalPrice}</span>
                                            </div>
                                            {booking.notes && <p className="text-sm text-gray-500 mt-3 italic bg-gray-50 p-2 inline-block">"{booking.notes}"</p>}
                                        </div>
                                        <div className="flex items-center gap-4 self-end md:self-center">
                                            <button className="px-6 py-3 text-xs font-bold tracking-widest uppercase border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                                                Details
                                            </button>
                                            {booking.paymentStatus !== 'paid' && (
                                                <button className="px-6 py-3 text-xs font-bold tracking-widest uppercase bg-black text-white hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                                                    Pay Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-16 text-center bg-gray-50 border border-gray-100">
                                <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No rides yet</h3>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Experience premium travel. Book your first ride with us today.</p>
                                <a href="/search" className="inline-block px-8 py-3 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-900 transition-all">
                                    Book a Ride
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {tab === 'account' && (
                    <div className="bg-white max-w-3xl mx-auto p-8 md:p-12 shadow-sm border border-gray-100">
                        <div className="flex flex-col items-center mb-12">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-light text-gray-400 mb-6">
                                {user?.email[0].toUpperCase()}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{user?.email}</h2>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">{user?.role || 'Customer'}</p>
                        </div>

                        <form className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-gray-200 py-2 text-gray-900 focus:border-black focus:outline-none transition-colors placeholder-gray-300"
                                        placeholder="John Doe"
                                        value={profileData.fullName}
                                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full border-b border-gray-200 py-2 text-gray-900 focus:border-black focus:outline-none transition-colors placeholder-gray-300"
                                        placeholder="+1 (555) 000-0000"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b pb-2 mb-4">Preferences</h4>
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 rounded-full">
                                            <Settings size={16} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                                            <p className="text-xs text-gray-500">Receive updates about your rides</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-8 flex items-center justify-between border-t border-gray-100 mt-8">
                                <button type="button" className="text-xs font-bold text-red-600 uppercase tracking-widest hover:text-red-800 hover:underline">
                                    Delete Account
                                </button>
                                <button type="button" className="px-8 py-3 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-900 transition-all shadow-lg">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {tab === 'promotions' && (
                    <div className="max-w-2xl mx-auto text-center py-20 bg-gray-50 border border-gray-100 rounded-none">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Tag className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="text-xl font-serif text-gray-900 mb-3">No Active Promotions</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-8">You currently don't have any active promotions. Check back later for exclusive offers on your next premium ride.</p>
                        <button className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                            View Terms & Conditions
                        </button>
                    </div>
                )}

                {tab === 'lessons' && (
                    <div className="space-y-6">
                        {/* Mock Lesson Data for Visual Verification */}
                        {[
                            {
                                id: 'l1',
                                package: "Beginner's License",
                                hoursCompleted: 4,
                                totalHours: 20,
                                instructor: "Sarah Jenkins",
                                nextLesson: "Dec 22, 2024 • 10:00 AM",
                                status: "In Progress"
                            },
                            {
                                id: 'l2',
                                package: "Defensive Driving",
                                hoursCompleted: 10,
                                totalHours: 10,
                                instructor: "David Chen",
                                nextLesson: "-",
                                status: "Completed"
                            }
                        ].map((lesson) => (
                            <div key={lesson.id} className="bg-white rounded-none border-l-4 border-orange-500 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${lesson.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                {lesson.status}
                                            </span>
                                            <span className="text-sm text-gray-500 font-medium flex items-center">
                                                <User className="w-4 h-4 mr-2" />
                                                Instr. {lesson.instructor}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">
                                            {lesson.package}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-500 gap-6">
                                            <span>Progress: {lesson.hoursCompleted} / {lesson.totalHours} Hrs</span>
                                            {lesson.nextLesson !== '-' && (
                                                <span className="font-semibold text-black">Next: {lesson.nextLesson}</span>
                                            )}
                                        </div>
                                        {/* Progress Bar */}
                                        <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden max-w-md">
                                            <div
                                                className="h-full bg-orange-500 transition-all duration-500"
                                                style={{ width: `${(lesson.hoursCompleted / lesson.totalHours) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 self-end md:self-center">
                                        <button className="px-6 py-3 text-xs font-bold tracking-widest uppercase border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                                            View Schedule
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
