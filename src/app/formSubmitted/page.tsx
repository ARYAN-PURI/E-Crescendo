"use client";
import {useRouter} from 'next/navigation';
export default function FormSubmitted(){
    let router=useRouter();
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-semibold mb-4 text-green-600">
                    Form Submitted Successfully!
                </h1>
                <p className="text-black-700 mb-6">
                    Thank you for submitting the form. We have received your information and will process it shortly.
                </p>
                <button className="text-lg font-semibold bg-green-800 rounded text-white py-2 px-5 hover:bg-green-200 hover:text-black"  onClick={()=>{router.push('/registrationForm')}}>Register Another Team</button>
            </div>
        </div>
    );
}