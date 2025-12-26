import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const { register: signup, loginWithGoogle, user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (!authLoading && user) {
            navigate('/');
        }
    }, [user, authLoading, navigate]);

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(data.email, data.password, data.role, {
                fullName: data.fullName,
                phone: data.phone,
                ...(data.role === 'driver' && {
                    city: data.city,
                    carMake: data.carMake,
                    carModel: data.carModel,
                    carYear: data.carYear,
                    plateNumber: data.plateNumber,
                    licenseNumber: data.licenseNumber,
                    vehicleType: 'Standard' // Default, could be a dropdown later
                })
            });
            console.log('Signup successful, navigating based on role...');

            if (data.role === 'driver') {
                navigate('/driver');
            } else if (data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/'); // Customers usually start at home to book services
            }
        } catch (err) {
            setError('Failed to create account: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle('customer'); // Default to customer for Google login on register page, usually requires profile update later for other roles
            navigate('/');
        } catch (err) {
            setError('Failed to log in with Google: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

                <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">I want to...</label>
                        <select
                            {...register("role")}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                        >
                            <option value="customer">Hire a Driver / Book Lessons</option>
                            <option value="driver">Be a Driver</option>
                            <option value="instructor">Be a Driving Instructor</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            {...register("fullName", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.fullName && <span className="text-red-500 text-xs">Name is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            {...register("phone", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.phone && <span className="text-red-500 text-xs">Phone is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: true, minLength: 6 })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-xs">Password must be at least 6 characters</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative mt-1">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (val) => {
                                        if (watch('password') != val) {
                                            return "Your passwords do no match";
                                        }
                                    }
                                })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
                    </div>

                    {watch('role') === 'driver' && (
                        <div className="space-y-4 border-t pt-4 mt-4">
                            <h3 className="text-lg font-medium text-gray-900">Vehicle & Driver Information</h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Vehicle Make</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Toyota"
                                        {...register("carMake", { required: watch('role') === 'driver' })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.carMake && <span className="text-red-500 text-xs">Vehicle Make is required</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Camry"
                                        {...register("carModel", { required: watch('role') === 'driver' })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.carModel && <span className="text-red-500 text-xs">Vehicle Model is required</span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">City (Service Area)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. New York"
                                    {...register("city", { required: watch('role') === 'driver' })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.city && <span className="text-red-500 text-xs">City is required</span>}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Vehicle Year</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 2020"
                                        {...register("carYear", { required: watch('role') === 'driver' })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.carYear && <span className="text-red-500 text-xs">Vehicle Year is required</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Plate Number</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. ABC-1234"
                                        {...register("plateNumber", { required: watch('role') === 'driver' })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.plateNumber && <span className="text-red-500 text-xs">Plate Number is required</span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Driver License Number</label>
                                <input
                                    type="text"
                                    {...register("licenseNumber", { required: watch('role') === 'driver' })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors.licenseNumber && <span className="text-red-500 text-xs">License Number is required</span>}
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
