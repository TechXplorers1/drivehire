import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, User, CreditCard, ChevronRight, Shield, Star, Calendar } from 'lucide-react';

const packages = {
    beginner: { name: "Beginner's License", price: 850, hours: 20 },
    refresher: { name: "Refresher Course", price: 300, hours: 6 },
    defensive: { name: "Defensive Driving", price: 450, hours: 10 }
};

const instructors = [
    { id: 1, name: "Sarah Jenkins", rating: 4.9, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200", bio: "Patient & Specialized in nervous drivers" },
    { id: 2, name: "David Chen", rating: 5.0, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200", bio: "Performance focus & Precision" },
    { id: 3, name: "Maria Rodriguez", rating: 4.8, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200", bio: "High pass rate expert" },
    { id: 'any', name: "Assign Best Available", rating: null, img: null, bio: "We'll pick the perfect match for you" }
];

// Steps Components
const Step1Package = ({ currentPackage, booking, setBooking }) => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <h2 className="text-2xl font-bold mb-4">Customize Your Course</h2>
        <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-2">{currentPackage.name}</h3>
            <p className="text-gray-400 mb-6">{currentPackage.hours} Hours of Behind-the-Wheel Instruction</p>
            <div className="text-4xl font-bold text-orange-500">${currentPackage.price}</div>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Select Transmission</label>
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setBooking({ ...booking, transmission: 'auto' })}
                    className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${booking.transmission === 'auto' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                >
                    <div className="font-bold text-lg mb-1">Automatic</div>
                    <div className="text-sm text-gray-500">Easier to learn, faster progress.</div>
                    {booking.transmission === 'auto' && <div className="absolute top-4 right-4 text-orange-500"><Check className="w-5 h-5" /></div>}
                </button>
                <button
                    onClick={() => setBooking({ ...booking, transmission: 'manual' })}
                    className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${booking.transmission === 'manual' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                >
                    <div className="font-bold text-lg mb-1">Manual</div>
                    <div className="text-sm text-gray-500">More control, traditional skill.</div>
                    {booking.transmission === 'manual' && <div className="absolute top-4 right-4 text-orange-500"><Check className="w-5 h-5" /></div>}
                </button>
            </div>
        </div>
    </div>
);

const Step2Instructor = ({ booking, setBooking }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <h2 className="text-2xl font-bold mb-4">Choose Your Instructor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {instructors.map((inst) => (
                <button
                    key={inst.id}
                    onClick={() => setBooking({ ...booking, instructorId: inst.id })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 group ${booking.instructorId === inst.id ? 'border-orange-500 ring-1 ring-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-200 hover:shadow-md bg-white'}`}
                >
                    {inst.img ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                            <img src={inst.img} alt={inst.name} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-400">
                            <User className="w-8 h-8" />
                        </div>
                    )}
                    <div>
                        <div className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{inst.name}</div>
                        {inst.rating && (
                            <div className="flex items-center text-xs text-amber-500 font-bold mb-1">
                                <Star className="w-3 h-3 fill-current mr-1" />
                                {inst.rating}
                            </div>
                        )}
                        <div className="text-xs text-gray-500 leading-tight">{inst.bio}</div>
                    </div>
                </button>
            ))}
        </div>
    </div>
);

const Step3Schedule = ({ booking, setBooking }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <h2 className="text-2xl font-bold mb-2">Schedule First Lesson</h2>
        <p className="text-gray-500 mb-6">Secure your first 2-hour slot now. Remaining hours can be booked later via your dashboard.</p>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        Select Date
                    </label>
                    <input
                        type="date"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium"
                        onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                        value={booking.date}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Time Slot</label>
                    <div className="grid grid-cols-2 gap-2">
                        {["09:00", "11:00", "14:00", "16:00"].map((time) => (
                            <button
                                key={time}
                                onClick={() => setBooking({ ...booking, timeId: time })}
                                className={`py-3 px-2 rounded-lg text-sm font-bold border transition-all ${booking.timeId === time ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {(booking.date && booking.timeId) && (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl flex items-center gap-3 text-sm border border-green-100">
                <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-700" />
                </div>
                <div>
                    <span className="font-bold">Excellent!</span> You're booking for <span className="font-bold">{booking.date}</span> at <span className="font-bold">{booking.timeId}</span>.
                </div>
            </div>
        )}
    </div>
);

const Step4Details = ({ booking, setBooking }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <h2 className="text-2xl font-bold mb-4">Student Details</h2>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">First Name</label>
                <input
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
                    value={booking.firstName}
                    onChange={(e) => setBooking({ ...booking, firstName: e.target.value })}
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Last Name</label>
                <input
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
                    value={booking.lastName}
                    onChange={(e) => setBooking({ ...booking, lastName: e.target.value })}
                />
            </div>
        </div>
        <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
            <input
                type="email"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
                value={booking.email}
                onChange={(e) => setBooking({ ...booking, email: e.target.value })}
            />
        </div>
        <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone</label>
            <input
                type="tel"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
                value={booking.phone}
                onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
            />
        </div>

        <div className="pt-4 border-t border-gray-100">
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input type="checkbox" className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 border-gray-300" />
                <span className="text-sm font-medium text-gray-700">I hold a valid provisional driving license</span>
            </label>
        </div>
    </div>
);

const Step5Payment = ({ currentPackage, booking, payment, onCardChange, onExpiryChange, onCvcChange }) => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <h2 className="text-2xl font-bold mb-4">Secure Checkout</h2>

        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="font-bold text-lg text-gray-900">{currentPackage.name}</h3>
                    <div className="text-sm text-gray-500 capitalize">{booking.transmission} • {instructors.find(i => i.id === booking.instructorId)?.name || 'Auto-Assigned Instructor'}</div>
                </div>
                <div className="font-bold text-xl">${currentPackage.price}</div>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">First Lesson</span>
                    <span className="font-medium">{booking.date} @ {booking.timeId}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxes & Fees</span>
                    <span className="font-medium">$0.00</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-6 border-t-2 border-dashed border-gray-200">
                <span className="font-bold text-lg">Total Due</span>
                <span className="font-bold text-2xl text-orange-600">${currentPackage.price}</span>
            </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-gray-900">
                <CreditCard className="w-5 h-5" />
                <span className="font-bold">Card Details</span>
            </div>
            <div className="space-y-4">
                <input
                    placeholder="0000 0000 0000 0000"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none font-mono text-lg focus:ring-2 focus:ring-orange-500 transition-all"
                    value={payment.cardNumber}
                    onChange={onCardChange}
                    maxLength={19}
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        placeholder="MM/YY"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none font-mono text-lg focus:ring-2 focus:ring-orange-500 transition-all"
                        value={payment.expiry}
                        onChange={onExpiryChange}
                        maxLength={5}
                    />
                    <input
                        placeholder="CVC"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none font-mono text-lg focus:ring-2 focus:ring-orange-500 transition-all"
                        value={payment.cvc}
                        onChange={onCvcChange}
                        maxLength={4}
                        type="password"
                    />
                </div>
            </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
            <Shield className="w-3 h-3" />
            Payments secured by Stripe. Your data is encrypted.
        </div>
    </div>
);

export default function SchoolBookingWizard() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const totalSteps = 5;

    // Initial state based on query params
    const [booking, setBooking] = useState({
        packageId: searchParams.get('package') || 'beginner',
        instructorId: searchParams.get('instructor') || 'any',
        transmission: 'auto',
        date: '',
        timeId: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const currentPackage = packages[booking.packageId] || packages.beginner;

    const [payment, setPayment] = useState({
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setPayment({ ...payment, cardNumber: formatted });
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        let formatted = value;
        if (value.length >= 2) formatted = value.slice(0, 2) + '/' + value.slice(2);
        setPayment({ ...payment, expiry: formatted });
    };

    const handleCvcChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        setPayment({ ...payment, cvc: value });
    };

    const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        navigate('/school'); // In real app, go to success page
    };

    return (
        <div className="min-h-screen bg-white py-12 md:py-24">
            <div className="max-w-3xl mx-auto px-6">
                {/* Progress Header */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Book Your Lessons</h1>
                        <div className="text-sm font-bold text-gray-400">Step {step} of {totalSteps}</div>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-500 transition-all duration-500 ease-out"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="mb-12 min-h-[400px]">
                    {step === 1 && <Step1Package currentPackage={currentPackage} booking={booking} setBooking={setBooking} />}
                    {step === 2 && <Step2Instructor booking={booking} setBooking={setBooking} />}
                    {step === 3 && <Step3Schedule booking={booking} setBooking={setBooking} />}
                    {step === 4 && <Step4Details booking={booking} setBooking={setBooking} />}
                    {step === 5 && (
                        <Step5Payment
                            currentPackage={currentPackage}
                            booking={booking}
                            payment={payment}
                            onCardChange={handleCardNumberChange}
                            onExpiryChange={handleExpiryChange}
                            onCvcChange={handleCvcChange}
                        />
                    )}
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
                        >
                            Back
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/school')}
                            className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:text-black hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                    )}

                    {step < totalSteps ? (
                        <button
                            onClick={handleNext}
                            className="px-10 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Next Step
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-10 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : `Complete Booking • $${currentPackage.price}`}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
