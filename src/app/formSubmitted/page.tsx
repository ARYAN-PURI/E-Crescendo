"use client";
import { useRouter } from 'next/navigation';

export default function FormSubmitted() {
    const router = useRouter();
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg text-center max-w-3xl w-full">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-green-600">
                    Form Submitted Successfully!
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
                    Thank you for submitting the form. We have received your information and will process it shortly.
                </p>
                <button 
                    className="text-base sm:text-lg md:text-xl font-semibold bg-green-800 rounded text-white py-2 px-4 sm:py-3 sm:px-6 hover:bg-green-600 transition-colors"
                    onClick={() => router.push('/registrationForm')}
                >
                    Register Another Team
                </button>
            </div>
        </div>
    );
}
