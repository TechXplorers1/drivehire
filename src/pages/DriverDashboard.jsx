import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Truck, MapPin, Calendar, DollarSign, Clock } from 'lucide-react';

export default function DriverDashboard() {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab') || 'assignments';

    // Mock Assignments
    const assignments = [
        { id: 101, type: 'One Way', from: 'JFK Airport', to: 'Manhattan, 5th Ave', date: '2025-12-20', time: '14:00', price: 150, status: 'Confirmed' },
        { id: 102, type: 'Hourly', from: 'Brooklyn Downtown', duration: '4 Hours', date: '2025-12-21', time: '09:00', price: 320, status: 'Pending' },
    ];

    return (
        <DashboardLayout role="driver">
            <h1 className="text-2xl font-bold mb-6 capitalize">{tab}</h1>

            {tab === 'assignments' && (
                <div className="space-y-4">
                    {assignments.map((job) => (
                        <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${job.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {job.status}
                                    </span>
                                    <span className="text-gray-500 text-sm flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" /> {job.date}
                                    </span>
                                    <span className="text-gray-500 text-sm flex items-center">
                                        <Clock className="w-4 h-4 mr-1" /> {job.time}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg mb-1">{job.type} Transfer</h3>
                                <div className="text-gray-600 text-sm flex items-center">
                                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                    {job.from} {job.to ? `→ ${job.to}` : `(${job.duration})`}
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 text-right">
                                <div className="text-2xl font-bold text-black">${job.price}</div>
                                <button className="mt-2 w-full md:w-auto px-4 py-2 bg-black text-white text-sm font-bold rounded hover:bg-gray-800">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
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
                        <div className="text-gray-500 text-sm mb-1">This Month</div>
                        <div className="text-3xl font-bold">$4,850.00</div>
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
                        <div className="pt-4 border-t">
                            <button className="text-indigo-600 font-medium text-sm hover:underline">Request Update</button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
