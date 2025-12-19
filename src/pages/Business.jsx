import { CheckCircle, Globe, Users, CreditCard, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Business() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="relative bg-gray-900 py-32 sm:py-48 text-center text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Business Meeting"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                        DriveHire for Business
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
                        Streamline your corporate ground travel. Global coverage, consolidated billing, and premium service for your team.
                    </p>
                    <div className="mt-10">
                        <button className="bg-white text-black px-8 py-3 font-bold rounded-sm hover:bg-gray-100 transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why partner with us?</h2>
                        <p className="text-gray-600 text-lg mb-8">
                            We understand the complexities of corporate travel. From duty of care to cost control, our platform handles it all.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Consolidated monthly invoicing",
                                "Priority booking status",
                                "Duty of care compliant",
                                "24/7 Dedicated account support",
                                "Detailed reporting and analytics"
                            ].map((item) => (
                                <li key={item} className="flex items-center text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-lg">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Request Information</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Business Email</label>
                                <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
                            </div>
                            <button className="w-full bg-black text-white font-bold py-2 rounded-sm hover:bg-gray-800">
                                Get in touch
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
