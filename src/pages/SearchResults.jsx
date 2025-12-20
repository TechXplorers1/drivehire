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
                <div className="flex justify-center items-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {drivers.map((driver) => (
                        <div key={driver.id} className="bg-white group overflow-hidden shadow-sm hover:shadow-xl rounded-2xl border border-gray-100 transition-all duration-300 flex flex-col">
                            <div className="h-56 w-full bg-gray-200 relative overflow-hidden">
                                <img
                                    src={driver.imageUrl}
                                    alt={driver.fullName}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                                    {driver.rating}
                                </div>
                            </div>
                            <div className="px-6 py-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{driver.fullName}</h3>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                        ${driver.hourlyRate}/hr
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    {driver.city}
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1">
                                    {driver.bio}
                                </p>
                                <div className="space-y-4 mt-auto">
                                    <div className="flex gap-2 flex-wrap">
                                        {driver.vehicleTypes?.slice(0, 3).map(v => (
                                            <span key={v} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                                                {v}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        to={`/book?driverId=${driver.id}`}
                                        className="block w-full text-center px-4 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        Book Driver
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {drivers.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                <MapPin className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No drivers found</h3>
                            <p className="mt-2 text-sm text-gray-500 max-w-sm">
                                We couldn't find any drivers matching your criteria. Try adjusting your filters or search for a different city.
                            </p>
                            <button
                                onClick={() => setCityFilter('')}
                                className="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
