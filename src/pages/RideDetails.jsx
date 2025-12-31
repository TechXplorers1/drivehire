import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { MapPin, Calendar, Clock, Car, Phone, Star, Shield, CreditCard, ChevronLeft } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';

export default function RideDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [ride, setRide] = useState(null);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setRide({
                id: id,
                status: 'scheduled', // scheduled, in_progress, completed, cancelled
                date: 'Dec 28, 2024',
                time: '2:30 PM',
                serviceType: 'Chauffeur Service',
                price: '320.00',
                paymentStatus: 'paid',
                pickup: '123 Luxury Ave, Beverly Hills, CA 90210',
                dropoff: 'LAX International Airport, Terminal B',
                driver: {
                    name: 'James Wilson',
                    rating: 4.9,
                    trips: 1240,
                    image: null // Placeholder
                },
                vehicle: {
                    model: 'Mercedes-Benz S-Class',
                    plate: 'LXY-888',
                    color: 'Obsidian Black'
                }
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) return <LoadingScreen message="Loading ride details..." />;

    if (!ride) return (
        <DashboardLayout role="user">
            <div className="max-w-4xl mx-auto text-center py-20">
                <h2 className="text-2xl font-serif text-gray-900">Ride not found</h2>
                <button onClick={() => navigate('/account')} className="mt-4 text-sm font-bold uppercase tracking-widest border-b border-black hover:text-gray-600">
                    Back to Rides
                </button>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout role="user">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/account')}
                    className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black mb-8 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Rides
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header */}
                        <div className="bg-white p-8 border-l-4 border-black shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest mb-3">
                                        {ride.status}
                                    </span>
                                    <h1 className="text-3xl font-serif text-gray-900">Ride #{ride.id}</h1>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">${ride.price}</div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-green-600 flex items-center justify-end gap-1">
                                        <CreditCard className="w-3 h-3" />
                                        {ride.paymentStatus}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Date</p>
                                    <div className="flex items-center text-gray-900 font-medium">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        {ride.date}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Time</p>
                                    <div className="flex items-center text-gray-900 font-medium">
                                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                        {ride.time}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Route Map Placeholder */}
                        <div className="bg-gray-100 h-64 w-full flex items-center justify-center border border-gray-200">
                            <div className="text-center">
                                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500 font-medium">Map View Unavailable</p>
                            </div>
                        </div>

                        {/* Locations */}
                        <div className="bg-white p-8 border border-gray-100 shadow-sm space-y-8">
                            <div className="relative pl-8 border-l-2 border-dashed border-gray-200 space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-white bg-black shadow-sm"></div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Pick Up</p>
                                    <p className="text-lg text-gray-900 font-medium">{ride.pickup}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-white bg-black shadow-sm"></div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Drop Off</p>
                                    <p className="text-lg text-gray-900 font-medium">{ride.dropoff}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Driver & Vehicle */}
                    <div className="space-y-6">
                        <div className="bg-black text-white p-8 shadow-lg">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-800 pb-2">Chauffeur</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                                    <span className="text-xl font-serif">{ride.driver.name[0]}</span>
                                </div>
                                <div>
                                    <p className="text-lg font-medium">{ride.driver.name}</p>
                                    <div className="flex items-center text-yellow-400 text-sm gap-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span>{ride.driver.rating}</span>
                                        <span className="text-gray-500 ml-2">({ride.driver.trips} rides)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
                                    Message
                                </button>
                                <button className="flex-1 border border-gray-700 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors">
                                    Call
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 border-b border-gray-100 pb-2">Vehicle</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Car className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">{ride.vehicle.model}</p>
                                        <p className="text-sm text-gray-500">{ride.vehicle.color} • {ride.vehicle.plate}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Shield className="w-5 h-5 text-green-600 mt-1" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Insured & Verified</p>
                                        <p className="text-xs text-gray-500">Ride covered by premium insurance</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-gray-100 text-red-600 text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-700 transition-colors">
                            Cancel Ride
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
