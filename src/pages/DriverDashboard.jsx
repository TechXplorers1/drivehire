import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { Truck, MapPin, Calendar, DollarSign, Clock, Settings, User, Car } from 'lucide-react';

export default function DriverDashboard() {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab') || 'requests';

    // Profile State
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        carModel: '',
        plateNumber: '',
        city: ''
    });

    // Load user data into state
    useEffect(() => {
        if (user) {
            setProfileData({
                fullName: user.fullName || 'Driver Name', // Mock default if missing
                email: user.email || '',
                phone: user.phone || '+1 (555) 000-0000',
                carModel: user.carModel || 'Mercedes-Benz S-Class',
                plateNumber: user.plateNumber || 'NYC-LUV-22',
                city: user.city || 'New York'
            });
        }
    }, [user]);

    // Mock Data State to simulate actions
    const [requests, setRequests] = useState([
        { id: 101, type: 'One Way', from: 'JFK Airport', to: 'Manhattan, 5th Ave', date: '2025-12-20', time: '14:00', price: 150, status: 'New' },
        { id: 103, type: 'City to City', from: 'New York', to: 'Philadelphia', date: '2025-12-22', time: '08:00', price: 450, status: 'New' },
    ]);

    const [upcoming, setUpcoming] = useState([
        { id: 102, type: 'Hourly', from: 'Brooklyn Downtown', duration: '4 Hours', date: '2025-12-21', time: '09:00', price: 320, status: 'Confirmed' },
    ]);

    const [history, setHistory] = useState([
        { id: 99, type: 'One Way', from: 'LaGuardia Airport', to: 'Queens', date: '2025-12-18', time: '10:30', price: 85, status: 'Completed' },
        { id: 98, type: 'Hourly', from: 'Manhattan', duration: '3 Hours', date: '2025-12-15', time: '19:00', price: 255, status: 'Completed' },
    ]);

    const handleAccept = (id) => {
        const ride = requests.find(r => r.id === id);
        if (ride) {
            setRequests(requests.filter(r => r.id !== id));
            setUpcoming([...upcoming, { ...ride, status: 'Confirmed' }]);
            alert(`Ride #${id} Accepted! Added to your schedule.`);
        }
    };

    const handleDecline = (id) => {
        setRequests(requests.filter(r => r.id !== id));
    };

    const renderCard = (ride, isRequest = false) => (
        <div key={ride.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${ride.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        ride.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {ride.status}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-1" /> {ride.date}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-1" /> {ride.time}
                    </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{ride.type} Transfer</h3>
                <div className="text-gray-600 text-sm flex items-center mb-2">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {ride.from} {ride.to ? `→ ${ride.to}` : `(${ride.duration})`}
                </div>
                <div className="text-2xl font-bold text-black">${ride.price}</div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2 w-full md:w-auto">
                {isRequest ? (
                    <>
                        <button
                            onClick={() => handleAccept(ride.id)}
                            className="w-full md:w-32 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded hover:bg-indigo-700 transition"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => handleDecline(ride.id)}
                            className="w-full md:w-32 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded hover:bg-gray-50 transition"
                        >
                            Decline
                        </button>
                    </>
                ) : (
                    <button className="w-full md:w-32 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded hover:bg-gray-800 transition">
                        View Details
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <DashboardLayout role="driver">
            <h1 className="text-2xl font-bold mb-6 capitalize">{tab === 'requests' ? 'New Requests' : tab}</h1>

            {tab === 'requests' && (
                <div className="space-y-4">
                    {requests.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">No new requests at the moment.</p>
                    ) : (
                        requests.map(r => renderCard(r, true))
                    )}
                </div>
            )}

            {tab === 'upcoming' && (
                <div className="space-y-4">
                    {upcoming.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">No upcoming rides scheduled.</p>
                    ) : (
                        upcoming.map(r => renderCard(r))
                    )}
                </div>
            )}

            {tab === 'history' && (
                <div className="space-y-4">
                    {history.map(r => renderCard(r))}
                </div>
            )}

            {tab === 'earnings' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-xl shadow-sm border">
                        <div className="text-gray-500 text-sm mb-1">Today</div>
                        <div className="text-3xl font-bold">$150.00</div>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-sm border">
                        <div className="text-gray-500 text-sm mb-1">This Week</div>
                        <div className="text-3xl font-bold">$1,240.00</div>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-sm border">
                        <div className="text-gray-500 text-sm mb-1">Total Earnings</div>
                        <div className="text-3xl font-bold">$8,450.00</div>
                    </div>
                </div>
            )}

            {tab === 'profile' && (
                <div className="bg-white max-w-3xl mx-auto p-8 md:p-12 shadow-sm border border-gray-100">
                    <div className="flex flex-col items-center mb-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-light text-gray-400 mb-6">
                            {profileData.email ? profileData.email[0].toUpperCase() : 'DR'}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{profileData.email}</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">{user?.role || 'Driver'}</p>
                    </div>

                    <form className="space-y-10">
                        {/* Personal Information */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b pb-2 mb-6">Personal Information</h4>
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
                        </div>

                        {/* Vehicle Information */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b pb-2 mb-6">Vehicle & Service Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Vehicle Model</label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-gray-200 py-2 text-gray-900 focus:border-black focus:outline-none transition-colors placeholder-gray-300"
                                        value={profileData.carModel}
                                        onChange={(e) => setProfileData({ ...profileData, carModel: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">License Plate</label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-gray-200 py-2 text-gray-900 focus:border-black focus:outline-none transition-colors placeholder-gray-300"
                                        value={profileData.plateNumber}
                                        onChange={(e) => setProfileData({ ...profileData, plateNumber: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Service City</label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-gray-200 py-2 text-gray-900 focus:border-black focus:outline-none transition-colors placeholder-gray-300"
                                        value={profileData.city}
                                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                    />
                                </div>
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
                                        <p className="text-sm font-medium text-gray-900">Ride Requests</p>
                                        <p className="text-xs text-gray-500">Receive new ride notifications</p>
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
                                Deactivate Account
                            </button>
                            <button type="button" className="px-8 py-3 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-900 transition-all shadow-lg">
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </DashboardLayout>
    );
}
