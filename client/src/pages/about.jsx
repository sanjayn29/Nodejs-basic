import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white z-10">Simplify Your Life</h2>
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                    </div>

                    <div className="p-8 md:p-10 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                We believe that productivity shouldn't be complicated. Our goal is to provide a clean, intuitive, and efficient tool that helps you organize your day, manage tasks, and achieve your goals without the clutter.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 pt-4">
                            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Simple</h4>
                                <p className="text-gray-600">No complex manuals needed. Just sign up and start organizing instantly.</p>
                            </div>

                            <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Fast</h4>
                                <p className="text-gray-600">Optimized performance ensures your tasks are saved and retrieved in milliseconds.</p>
                            </div>

                            <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Secure</h4>
                                <p className="text-gray-600">Your data is yours alone. We use industry-standard encryption to keep it safe.</p>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose Us?</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Intuitive interface designed for focus
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Free for personal use
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Accessible from any device
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
