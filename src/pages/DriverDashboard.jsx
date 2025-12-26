import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Truck, MapPin, Calendar, DollarSign, Clock } from 'lucide-react';

export default function DriverDashboard() {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab') || 'requests';
    const [activeTab, setActiveTab] = useState(tab);

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
                <div className="bg-white p-8 rounded-xl shadow-sm border max-w-2xl">
                    <div className="flex items-center mb-8">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                            DR
                        </div>
                        <div className="ml-4">
                            <h2 className="text-xl font-bold">Driver Profile</h2>
                            <p className="text-gray-500">Manage your vehicle and license documents.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                            <input disabled value="Mercedes-Benz S-Class (Black)" className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                            <input disabled value="NYC-LUV-22" className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Area</label>
                            <input disabled value="New York" className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-600" />
                        </div>
                        <div className="pt-4 border-t">
                            <button className="text-indigo-600 font-medium text-sm hover:underline">Request Profile Update</button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
