import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { arrow_left, mailc, support, whatsappC } from "../assets";
import { useNavigate } from "react-router-dom";

interface SupportOption {
    title: string;
    description: string;
    contacts: string[];
    image: any
}

const ContactSupport: React.FC = () => {
    const navigate = useNavigate();

    // Support options (dynamic data)
    const supportOptions: SupportOption[] = [
        {
            title: "Speak",
            description: "Speak directly with our team",
            contacts: ["+234 707375792 +234 8112159041"],
            image: support
        },
        {
            title: "WhatsApp",
            description: "Chat with us on WhatsApp",
            contacts: ["+234 8023345567"],
            image: whatsappC
        },
        {
            title: "Email",
            description: "Send us a quick email",
            contacts: ["support@example.com"],
            image: mailc
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="p-4 min-h-[90vh]">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={arrow_left}
                            onClick={() => navigate(-1)}
                            alt="back"
                            className="cursor-pointer"
                        />
                        <h3 className="text-lg font-medium">Contact Support</h3>
                    </div>

                    {/* Support Options */}
                    <div>
                        {supportOptions.map((option, idx) => (
                            <div
                                key={idx}
                                className="flex items-start text-sm my-4 border border-gray-200 p-3 rounded-lg hover:border-green-main"
                            >
                                <img src={option.image} alt={option.title} className="mr-3" />
                                <div className="space-y-1">
                                    <p className="font-semibold">{option.title}</p>
                                    <p className="text-[#61656B]">{option.description}</p>
                                    <div className="text-[#61656B] text-xs">
                                        {option.contacts.map((c, i) => (
                                            <p key={i}>{c}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactSupport;
