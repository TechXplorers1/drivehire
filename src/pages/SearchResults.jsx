import { useState, useEffect } from 'react';
import { getDrivers } from '../lib/db';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

export default function SearchResults() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cityFilter, setCityFilter] = useState('');

    useEffect(() => {
        // Initial load
        fetchDrivers();
    }, []);

    const fetchDrivers = async (city) => {
        setLoading(true);
        const data = await getDrivers(city);
        setDrivers(data);
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchDrivers(cityFilter || undefined);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Filter by City (e.g. New York)"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Search
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {drivers.map((driver) => (
                        <div key={driver.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 flex flex-col">
                            <div className="h-48 w-full bg-gray-200 relative">
                                <img src={driver.imageUrl} alt={driver.fullName} className="w-full h-full object-cover" />
                            </div>
                            <div className="px-4 py-5 flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{driver.fullName}</h3>
                                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-xs font-bold text-yellow-800">
                                        <Star className="w-3 h-3 mr-1 fill-current" />
                                        {driver.rating}
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    {driver.city}
                                </div>
                                <p className="mt-4 text-sm text-gray-500 line-clamp-3">
                                    {driver.bio}
                                </p>
                                <div className="mt-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        ${driver.hourlyRate}/hr
                                    </span>
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                        {driver.vehicleTypes?.map(v => (
                                            <span key={v} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                                {v}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-4 bg-gray-50 text-right">
                                <Link
                                    to={`/book?driverId=${driver.id}`}
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Book Now &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}

                    {drivers.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No drivers found. Try running the seeder or changing filters.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
