import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Shield, Calendar, Award, CheckCircle } from 'lucide-react';

const MOCK_DRIVERS = [
    {
        id: 'd1',
        fullName: 'James Wilson',
        avgRating: 4.9,
        totalRides: 1240,
        city: 'New York',
        vehicle: {
            make: 'Mercedes-Benz',
            model: 'S-Class',
            year: 2023,
            type: 'Luxury',
            plate: 'NYC-8821',
            image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop'
        },
        profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop',
        pricePerHour: 85,
        pricePerKm: 2.5,
        baseRate: 50,
        languages: ['English', 'Spanish'],
        verified: true,
        bio: 'Professional chauffeur with over 10 years of experience serving VIP clients in New York City. Known for punctuality and discretion.',
        amenities: ['Wi-Fi', 'Bottled Water', 'Phone Charger', 'Newspapers']
    },
    {
        id: 'd2',
        fullName: 'Sarah Jenkins',
        avgRating: 4.8,
        totalRides: 850,
        city: 'Los Angeles',
        vehicle: {
            make: 'Tesla',
            model: 'Model S',
            year: 2022,
            type: 'Electric',
            plate: 'LA-9923',
            image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070&auto=format&fit=crop'
        },
        profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
        pricePerHour: 75,
        pricePerKm: 2.0,
        baseRate: 40,
        languages: ['English'],
        verified: true,
        bio: 'Local LA expert who knows all the shortcuts. specializing in comfortable, eco-friendly rides.',
        amenities: ['Wi-Fi', 'Bottled Water', 'Spotify Premium']
    },
    {
        id: 'd3',
        fullName: 'Michael Chen',
        avgRating: 5.0,
        totalRides: 2100,
        city: 'San Francisco',
        vehicle: {
            make: 'BMW',
            model: '7 Series',
            year: 2024,
            type: 'Luxury',
            plate: 'SF-5541',
            image: 'https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=2070&auto=format&fit=crop'
        },
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
        pricePerHour: 95,
        pricePerKm: 3.0,
        baseRate: 60,
        languages: ['English', 'Mandarin'],
        verified: true,
        bio: 'Top-rated executive driver. I ensure a smooth and productive ride for business travelers.',
        amenities: ['Wi-Fi', 'Bottled Water', 'Tablet', 'Work Table']
    },
    {
        id: 'd4',
        fullName: 'Robert Fox',
        avgRating: 4.7,
        totalRides: 560,
        city: 'Chicago',
        vehicle: {
            make: 'Cadillac',
            model: 'Escalade',
            year: 2023,
            type: 'SUV',
            plate: 'CHI-2211',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop'
        },
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
        pricePerHour: 90,
        pricePerKm: 2.8,
        baseRate: 55,
        languages: ['English'],
        verified: true,
        bio: 'Specializing in airport transfers and group travel. My Escalade offers maximum comfort and luggage space.',
        amenities: ['Wi-Fi', 'Bottled Water', 'Heated Seats']
    }
];

export default function AvailableDrivers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [serviceMode, setServiceMode] = useState('hourly'); // 'hourly', 'one-way', 'city-to-city'
    const [selectedDriver, setSelectedDriver] = useState(null);

    const filteredDrivers = MOCK_DRIVERS.filter(driver => {
        const matchesCity = driver.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || driver.vehicle.type === selectedType;
        return matchesCity && matchesType;
    });

    const vehicleTypes = ['All', 'Luxury', 'SUV', 'Electric'];

    // Modal Component
    const DriverModal = ({ driver, onClose }) => {
        if (!driver) return null;
        return (
            <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div className="absolute top-0 right-0 pt-4 pr-4">
                            <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-2xl leading-6 font-bold text-gray-900" id="modal-title">
                                    {driver.fullName}
                                </h3>
                                <div className="mt-2 text-sm text-yellow-500 flex items-center mb-4">
                                    <Star className="w-4 h-4 fill-current mr-1" />
                                    <span className="font-semibold text-gray-900">{driver.avgRating}</span>
                                    <span className="text-gray-400 mx-1">•</span>
                                    <span className="text-gray-500">{driver.totalRides} rides</span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 italic mb-4">"{driver.bio}"</p>

                                    <h4 className="font-semibold text-gray-900 text-sm mt-4 mb-2">Vehicle</h4>
                                    <p className="text-sm text-gray-600">{driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model} ({driver.vehicle.type})</p>

                                    <h4 className="font-semibold text-gray-900 text-sm mt-4 mb-2">Languages</h4>
                                    <div className="flex gap-2">
                                        {driver.languages.map(l => (
                                            <span key={l} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {l}
                                            </span>
                                        ))}
                                    </div>

                                    <h4 className="font-semibold text-gray-900 text-sm mt-4 mb-2">Amenities</h4>
                                    <ul className="text-sm text-gray-600 list-disc pl-5 grid grid-cols-2">
                                        {driver.amenities?.map(a => (
                                            <li key={a}>{a}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <Link
                                to={`/book?driverId=${driver.id}&serviceType=${serviceMode}`}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Book Now
                            </Link>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 relative">
            <DriverModal driver={selectedDriver} onClose={() => setSelectedDriver(null)} />

            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Available Drivers</h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Browse our network of professional chauffeurs filtered by your location.
                        Select the perfect vehicle and driver for your journey.
                    </p>

                    {/* Service Mode Selector */}
                    <div className="mt-8 mb-6">
                        <div className="sm:hidden">
                            <select
                                id="tabs"
                                name="tabs"
                                className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                value={serviceMode}
                                onChange={(e) => setServiceMode(e.target.value)}
                            >
                                <option value="hourly">Hourly Service</option>
                                <option value="one-way">One Way Transfer</option>
                                <option value="city-to-city">City to City</option>
                            </select>
                        </div>
                        <div className="hidden sm:block">
                            <nav className="flex space-x-4" aria-label="Tabs">
                                <button
                                    onClick={() => setServiceMode('hourly')}
                                    className={`${serviceMode === 'hourly' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'} px-3 py-2 font-medium text-sm rounded-md transition-colors`}
                                >
                                    Hourly Service
                                </button>
                                <button
                                    onClick={() => setServiceMode('one-way')}
                                    className={`${serviceMode === 'one-way' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'} px-3 py-2 font-medium text-sm rounded-md transition-colors`}
                                >
                                    One Way Transfer
                                </button>
                                <button
                                    onClick={() => setServiceMode('city-to-city')}
                                    className={`${serviceMode === 'city-to-city' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'} px-3 py-2 font-medium text-sm rounded-md transition-colors`}
                                >
                                    City to City
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-all"
                                placeholder="Enter city (e.g. New York)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            {vehicleTypes.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedType === type
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Drivers Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredDrivers.map((driver) => (
                        <div key={driver.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                            {/* Car Image Section */}
                            <div className="md:w-2/5 relative h-64 md:h-auto bg-gray-100">
                                <img
                                    src={driver.vehicle.image}
                                    alt={`${driver.vehicle.make} ${driver.vehicle.model}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    <p className="text-white font-bold text-lg">{driver.vehicle.make} {driver.vehicle.model}</p>
                                    <p className="text-indigo-200 text-sm font-medium">{driver.vehicle.year} • {driver.vehicle.type}</p>
                                </div>
                            </div>

                            {/* Driver Details Section */}
                            <div className="p-6 md:w-3/5 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={driver.profileImage}
                                            alt={driver.fullName}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-50"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1">
                                                {driver.fullName}
                                                {driver.verified && <CheckCircle className="w-4 h-4 text-indigo-500" fill="currentColor" stroke="white" />}
                                            </h3>
                                            <div className="flex items-center text-sm text-yellow-500">
                                                <Star className="w-4 h-4 fill-current mr-1" />
                                                <span className="font-semibold text-gray-900">{driver.avgRating}</span>
                                                <span className="text-gray-400 mx-1">•</span>
                                                <span className="text-gray-500">{driver.totalRides} rides</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold text-indigo-600">
                                            {serviceMode === 'hourly' && `$${driver.pricePerHour}`}
                                            {serviceMode === 'one-way' && `$${driver.pricePerKm}`}
                                            {serviceMode === 'city-to-city' && `$${driver.baseRate}`}
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium">
                                            {serviceMode === 'hourly' && 'per hour'}
                                            {serviceMode === 'one-way' && 'per km'}
                                            {serviceMode === 'city-to-city' && 'base rate'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                        {driver.city}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Award className="w-4 h-4 mr-2 text-gray-400" />
                                        Top Rated
                                    </div>
                                    <div className="flex items-center text-gray-600 col-span-2">
                                        <Shield className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>License: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{driver.vehicle.plate}</span></span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-50 flex gap-3">
                                    <Link
                                        to={`/book?driverId=${driver.id}&serviceType=${serviceMode}`}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl text-center transition-colors shadow-lg shadow-indigo-200"
                                    >
                                        Book Now
                                    </Link>
                                    <button
                                        onClick={() => setSelectedDriver(driver)}
                                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredDrivers.length === 0 && (
                        <div className="col-span-full py-16 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <MapPin className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No drivers found in this area</h3>
                            <p className="mt-2 text-gray-500">Try searching for a different city or check back later.</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-4 text-indigo-600 font-semibold hover:text-indigo-500"
                            >
                                Show all drivers
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
