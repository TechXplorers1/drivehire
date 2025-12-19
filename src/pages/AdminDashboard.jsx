import { seedDatabase } from '../lib/seeder';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Users, Car, Settings, Database } from 'lucide-react';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab') || 'overview';

    const handleSeed = async () => {
        if (!window.confirm("This will add sample data to Firestore. Continue?")) return;
        setLoading(true);
        const success = await seedDatabase();
        setLoading(false);
        if (success) {
            setMsg("Database seeded successfully!");
        } else {
            setMsg("Failed to seed database. Check console for details (likely permission issues).");
        }
    };

    return (
        <DashboardLayout role="admin">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{tab === 'overview' ? 'Admin Overview' : tab}</h1>

            {tab === 'overview' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Total Users</div>
                            <div className="text-3xl font-bold text-gray-900 mt-2">1,240</div>
                            <div className="text-xs text-green-600 mt-1">↑ 12% from last month</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Active Drivers</div>
                            <div className="text-3xl font-bold text-gray-900 mt-2">48</div>
                            <div className="text-xs text-green-600 mt-1">↑ 2 new this week</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Total Bookings</div>
                            <div className="text-3xl font-bold text-gray-900 mt-2">856</div>
                            <div className="text-xs text-green-600 mt-1">↑ 24 today</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Revenue (Mo)</div>
                            <div className="text-3xl font-bold text-gray-900 mt-2">$42.5k</div>
                            <div className="text-xs text-green-600 mt-1">↑ 8% from last month</div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleSeed}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                            >
                                <Database className="w-4 h-4 mr-2" />
                                {loading ? 'Seeding...' : 'Seed Database'}
                            </button>
                            {msg && <p className="mt-2 text-sm font-medium text-green-600">{msg}</p>}
                        </div>
                    </div>
                </div>
            )}

            {tab === 'users' && (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[1, 2, 3].map((i) => (
                                <tr key={i}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                                U{i}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">User {i}</div>
                                                <div className="text-sm text-gray-500">user{i}@example.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Customer
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Active
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'drivers' && (
                <div className="p-8 text-center bg-white rounded-xl border border-dashed border-gray-300">
                    <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Driver management module coming soon.</p>
                </div>
            )}

            {tab === 'settings' && (
                <div className="p-8 text-center bg-white rounded-xl border border-dashed border-gray-300">
                    <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">System settings module coming soon.</p>
                </div>
            )}
        </DashboardLayout>
    );
}
