import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import LocationInput from './LocationInput';

export default function BookingWidget({ initialType = 'oneway', className = '' }) {
    const [serviceType, setServiceType] = useState(initialType);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, watch } = useForm();

    const onSubmit = (data) => {
        // Navigate to booking wizard with pre-filled data
        navigate(`/search?type=${serviceType}&pickup=${data.pickup}&date=${data.date}`);
    };

    return (
        <div className={`bg-white rounded shadow-2xl p-6 md:p-8 max-w-4xl mx-auto -mt-24 relative z-20 ${className}`}>
            {/* Tabs */}
            <div className="flex space-x-8 border-b border-gray-100 mb-6 overflow-x-auto">
                <button
                    className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${serviceType === 'oneway'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                        }`}
                    onClick={() => setServiceType('oneway')}
                >
                    One Way
                </button>
                <button
                    className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${serviceType === 'hourly'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                        }`}
                    onClick={() => setServiceType('hourly')}
                >
                    By the Hour
                </button>
                <button
                    className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${serviceType === 'city_to_city'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                        }`}
                    onClick={() => setServiceType('city_to_city')}
                >
                    City to City
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Pickup */}
                <div className="md:col-span-1 relative">
                    <LocationInput
                        label="Pickup Location"
                        placeholder={serviceType === 'city_to_city' ? "Enter pickup city" : "Enter pickup address"}
                        onSelect={(val) => setValue('pickup', val)}
                    />
                    {/* Hidden input for validation if needed, though onSelect handles value */}
                    <input type="hidden" {...register("pickup", { required: true })} />
                </div>

                {/* Dropoff (One Way / City to City) OR Duration (Hourly) */}
                <div className="md:col-span-1 relative">
                    {serviceType === 'hourly' ? (
                        <>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Duration</label>
                            <div className="flex items-center border-b border-gray-200 py-2">
                                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                                <select
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    {...register("duration")}
                                >
                                    <option value="2">2 Hours</option>
                                    <option value="4">4 Hours</option>
                                    <option value="8">8 Hours</option>
                                    <option value="12">12 Hours</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <LocationInput
                                label="Dropoff Location"
                                placeholder={serviceType === 'city_to_city' ? "Enter destination city" : "Enter destination"}
                                onSelect={(val) => setValue('dropoff', val)}
                            />
                            <input type="hidden" {...register("dropoff")} />
                        </>
                    )}
                </div>

                {/* Date & Time */}
                <div className="md:col-span-1 relative">
                    <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Date & Time</label>
                    <div className="flex items-center border-b border-gray-200 py-2">
                        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="datetime-local"
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            {...register("date", { required: true })}
                        />
                    </div>
                </div>

                {/* Submit */}
                <div className="md:col-span-1 flex items-end">
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold py-3 px-6 rounded-sm shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                    >
                        Search Vehicles
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
