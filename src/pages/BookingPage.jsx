import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getDriverById, createBooking } from '../lib/db';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { format, addHours } from 'date-fns';

export default function BookingPage() {
    const [searchParams] = useSearchParams();
    const driverId = searchParams.get('driverId');
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // Watch fields for summary
    const date = watch('date');
    const time = watch('time');
    const duration = watch('duration', 2);

    useEffect(() => {
        if (!driverId) return;
        async function load() {
            const d = await getDriverById(driverId);
            setDriver(d);
            setLoading(false);
        }
        load();
    }, [driverId]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await createBooking({
                userId: user.uid,
                userEmail: user.email,
                driverId: driver.id,
                driverName: driver.fullName,
                serviceType: 'chauffeur',
                date: data.date,
                time: data.time,
                duration: Number(data.duration),
                totalPrice: Number(data.duration) * driver.hourlyRate,
                notes: data.notes || ''
            });
            alert('Booking Request Sent!');
            navigate('/account');
        } catch (e) {
            alert('Error booking: ' + e.message);
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!driver) return <div className="p-8 text-center">Driver not found</div>;

    const steps = [
        { number: 1, title: 'Details' },
        { number: 2, title: 'Review & Pay' }
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav aria-label="Progress" className="mb-8">
                <ol role="list" className="flex items-center">
                    {steps.map((s, index) => (
                        <li key={s.number} className={`${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>
                            <div className="flex items-center group">
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-2 ring-offset-2 ${step >= s.number ? 'bg-indigo-600 ring-indigo-600' : 'bg-white ring-gray-300'}`}>
                                    <span className={`text-white font-bold`}>{s.number}</span>
                                </span>
                                <span className="ml-4 text-sm font-medium text-gray-900">{s.title}</span>
                            </div>
                            {index !== steps.length - 1 && (
                                <div className="hidden sm:block absolute top-0 right-0 h-full w-5" aria-hidden="true">

                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Book {driver.fullName}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Hourly Chauffeur Service - ${driver.hourlyRate}/hr
                    </p>
                </div>

                <div className="px-4 py-5 sm:p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Step 1: Input */}
                        <div className={step === 1 ? 'block space-y-6' : 'hidden'}>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        {...register("date", { required: true })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">Time</label>
                                    <input
                                        type="time"
                                        {...register("time", { required: true })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Duration (Hours)</label>
                                    <select
                                        {...register("duration", { required: true })}
                                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="2">2 Hours (Minimum)</option>
                                        <option value="3">3 Hours</option>
                                        <option value="4">4 Hours</option>
                                        <option value="6">6 Hours</option>
                                        <option value="8">8 Hours (Full Day)</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Pickup Location / Notes</label>
                                    <textarea
                                        {...register("notes")}
                                        rows={3}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-5">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!date || !time}
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Next: Review
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Review (and fake Stripe) */}
                        <div className={step === 2 ? 'block space-y-6' : 'hidden'}>
                            <div className="bg-gray-50 rounded-md p-4 mb-4">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Order Summary</h4>
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 text-sm">
                                    <div className="sm:col-span-1">
                                        <dt className="text-gray-500">Service</dt>
                                        <dd className="text-gray-900 font-medium">{driver.fullName} (Chauffeur)</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-gray-500">Date & Time</dt>
                                        <dd className="text-gray-900 font-medium">{date} at {time}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-gray-500">Duration</dt>
                                        <dd className="text-gray-900 font-medium">{duration} hours</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-gray-500">Total Price</dt>
                                        <dd className="text-gray-900 font-bold text-lg">${Number(duration) * driver.hourlyRate}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="border border-gray-300 rounded p-4">
                                <h4 className="font-bold text-gray-900 mb-2">Payment Details (Placeholder)</h4>
                                <div className="bg-yellow-50 p-3 rounded text-yellow-800 text-sm mb-3">
                                    This is a demonstration. No real payment will be processed.
                                </div>

                                <div className="space-y-4">
                                    <input placeholder="Card number" className="block w-full border-gray-300 rounded-md shadow-sm border p-2" disabled />
                                    <div className="flex gap-4">
                                        <input placeholder="MM/YY" className="block w-1/2 border-gray-300 rounded-md shadow-sm border p-2" disabled />
                                        <input placeholder="CVC" className="block w-1/2 border-gray-300 rounded-md shadow-sm border p-2" disabled />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-5">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    {loading ? 'Processing...' : 'Confirm & Pay'}
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
