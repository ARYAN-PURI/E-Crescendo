"use client";
import { useState } from "react";
import axios from "axios";

export default function EditResponseForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendEmail() {
        setLoading(true);
        try {
            if (email === "") {
                setMessage('Email Field cannot be empty');
            } else {
                const result = await axios.post('/api/sendEmail', { email: email });
                console.log(result);
                if (!result.data.success) {
                    setMessage('The team email does not exist');
                } else {
                    setMessage('An email has been sent to the registered email');
                    setEmail("");
                }
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full">
                <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 text-center">Enter the Registered Email</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                />
                <div className="mb-4">
                    {
                        loading ?
                            <button
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                                disabled
                            >
                                Loading ...
                            </button>
                            :
                            <button
                                onClick={sendEmail}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                            >
                                Send Email
                            </button>
                    }
                </div>
                <div className="mt-4">
                    {message !== "" && (
                        <div className={`text-sm font-medium p-2 rounded-lg ${message.includes("not") ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
