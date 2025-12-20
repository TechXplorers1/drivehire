import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, Calendar, User, CreditCard, ChevronRight, ChevronLeft, Shield } from 'lucide-react';

const packages = {
    beginner: { name: "Beginner's License", price: 850, hours: 20 },
    refresher: { name: "Refresher Course", price: 300, hours: 6 },
    defensive: { name: "Defensive Driving", price: 450, hours: 10 }
};

// Steps Components Defined Outside to prevent re-renders
const Step1Package = ({ currentPackage, booking, setBooking }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Customize Your Course</h2>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold mb-2">{currentPackage.name}</h3>
            <p className="text-gray-500 mb-4">{currentPackage.hours} Hours of Instruction</p>
            <div className="text-3xl font-bold text-orange-600">${currentPackage.price}</div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Transmission</label>
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setBooking({ ...booking, transmission: 'auto' })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${booking.transmission === 'auto' ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-gray-200 hover:border-gray-300'}`}
                >
                    <div className="font-bold mb-1">Automatic</div>
                    <div className="text-xs text-gray-500">Easier to learn</div>
                </button>
                <button
                    onClick={() => setBooking({ ...booking, transmission: 'manual' })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${booking.transmission === 'manual' ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-gray-200 hover:border-gray-300'}`}
                >
                    <div className="font-bold mb-1">Manual</div>
                    <div className="text-xs text-gray-500">More control</div>
                </button>
            </div>
        </div>
    </div>
);

const Step2Schedule = ({ booking, setBooking }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Schedule First Lesson</h2>
        <p className="text-gray-500 text-sm mb-6">You can schedule the rest of your lessons later with your instructor.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    value={booking.date}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    onChange={(e) => setBooking({ ...booking, timeId: e.target.value })}
                    value={booking.timeId}
                >
                    <option value="">Select a time</option>
                    <option value="09:00">09:00 AM - 11:00 AM</option>
                    <option value="11:00">11:00 AM - 01:00 PM</option>
                    <option value="14:00">02:00 PM - 04:00 PM</option>
                    <option value="16:00">04:00 PM - 06:00 PM</option>
                </select>
            </div>
        </div>

        {(booking.date && booking.timeId) && (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center gap-3 text-sm">
                <Check className="w-5 h-5" />
                Slot available for {booking.date} at {booking.timeId}
            </div>
        )}
    </div>
);

const Step3Details = ({ booking, setBooking }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Student Details</h2>
        <div className="grid grid-cols-2 gap-4">
            <input
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={booking.firstName}
                onChange={(e) => setBooking({ ...booking, firstName: e.target.value })}
            />
            <input
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={booking.lastName}
                onChange={(e) => setBooking({ ...booking, lastName: e.target.value })}
            />
        </div>
        <input
            placeholder="Email Address"
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={booking.email}
            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
        />
        <input
            placeholder="Phone Number"
            type="tel"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={booking.phone}
            onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
        />
        <div className="pt-4 border-t border-gray-200">
            <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
                <span className="text-sm text-gray-600">I have a provisional driving license</span>
            </label>
        </div>
    </div>
);

const Step4Payment = ({ currentPackage, booking, payment, onCardChange, onExpiryChange, onCvcChange }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Secure Payment</h2>

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <div className="flex justify-between mb-2">
                <span className="text-gray-600">{currentPackage.name}</span>
                <span className="font-bold">${currentPackage.price}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm text-gray-500">
                <span>Transmission</span>
                <span className="capitalize">{booking.transmission}</span>
            </div>
            <div className="border-t border-gray-200 my-4" />
            <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${currentPackage.price}</span>
            </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="font-bold text-gray-700">Card Details</span>
            </div>
            <input
                placeholder="Card Number"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg mb-3 outline-none font-mono"
                value={payment.cardNumber}
                onChange={onCardChange}
                maxLength={19}
            />
            <div className="grid grid-cols-2 gap-3">
                <input
                    placeholder="MM/YY"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none font-mono"
                    value={payment.expiry}
                    onChange={onExpiryChange}
                    maxLength={5}
                />
                <input
                    placeholder="CVC"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none font-mono"
                    value={payment.cvc}
                    onChange={onCvcChange}
                    maxLength={4}
                    type="password"
                />
            </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
            <Shield className="w-3 h-3" />
            Secure 256-bit SSL Encrypted payment
        </div>
    </div>
);

export default function SchoolBookingWizard() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Initial state based on query params
    const [booking, setBooking] = useState({
        packageId: searchParams.get('package') || 'beginner',
        transmission: 'auto',
        date: '',
        timeId: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        license: ''
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
        // Add spaces every 4 digits
        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setPayment({ ...payment, cardNumber: formatted });
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);

        let formatted = value;
        if (value.length >= 2) {
            formatted = value.slice(0, 2) + '/' + value.slice(2);
        }
        setPayment({ ...payment, expiry: formatted });
    };

    const handleCvcChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        setPayment({ ...payment, cvc: value });
    };

    const handleNext = () => {
        setStep(prev => Math.min(prev + 1, 4));
    };

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        // Navigate to success or show success state
        alert("Booking Confirmed! (This is a demo)");
        navigate('/school');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        <span className={step >= 1 ? "text-orange-500" : ""}>Package</span>
                        <span className={step >= 2 ? "text-orange-500" : ""}>Schedule</span>
                        <span className={step >= 3 ? "text-orange-500" : ""}>Details</span>
                        <span className={step >= 4 ? "text-orange-500" : ""}>Payment</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-500 transition-all duration-500 ease-out"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                    <div className="p-8 flex-grow">
                        {step === 1 && <Step1Package currentPackage={currentPackage} booking={booking} setBooking={setBooking} />}
                        {step === 2 && <Step2Schedule booking={booking} setBooking={setBooking} />}
                        {step === 3 && <Step3Details booking={booking} setBooking={setBooking} />}
                        {step === 4 && (
                            <Step4Payment
                                currentPackage={currentPackage}
                                booking={booking}
                                payment={payment}
                                onCardChange={handleCardNumberChange}
                                onExpiryChange={handleExpiryChange}
                                onCvcChange={handleCvcChange}
                            />
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="px-6 py-2 rounded-lg font-bold text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
                            >
                                Back
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/school')}
                                className="px-6 py-2 rounded-lg font-bold text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                        )}

                        {step < 4 ? (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                            >
                                Next Step
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading || payment.cardNumber.length < 19 || payment.expiry.length < 5 || payment.cvc.length < 3}
                                className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25"
                            >
                                {loading ? 'Processing...' : `Pay $${currentPackage.price}`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
