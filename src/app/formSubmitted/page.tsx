"use client";
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function FormSubmitted() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-between rounded items-center bg-gradient-to-br  from-gray-700 via-gray-900 to-black min-h-screen ">
            <NavBar />
            <div className='px-3'>
                <div className="bg-white my-[60%] sm:my-[45%] md:my-[35%] lg:my-[25%] p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg text-center max-w-3xl w-full">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-blue-600">
                        Form Submitted Successfully!
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
                        Thank you for submitting the form. We have received your information and will process it shortly.
                    </p>
                    <button
                        className="text-base sm:text-lg md:text-xl font-semibold bg-blue-800 rounded text-white py-2 px-4 sm:py-3 sm:px-6 hover:bg-blue-200 hover:text-black transition-colors"
                        onClick={() => router.push('/registrationForm')}
                    >
                        Register Another Team
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
