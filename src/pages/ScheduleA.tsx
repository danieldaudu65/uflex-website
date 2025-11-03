import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ScheduleA: React.FC = () => {
    return (
        <div className="bg-white text-gray-800">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12 leading-relaxed">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Schedule A — Data Protection Implementation & Privacy Summary
                </h1>

                <h2 className="text-xl font-semibold mb-2">
                    1. Internal Compliance Memo
                </h2>
                <p className="mb-4">
                    To operationalise this policy, U-Flex Shuttle Services should:
                </p>
                <ul className="list-decimal ml-6 space-y-2 mb-6">
                    <li>
                        Maintain a register of data processing activities — recording
                        categories of processing, purposes, lawful bases, and retention
                        periods.
                    </li>
                    <li>
                        Ensure contracts with processors (payments, SMS, cloud services)
                        require NDPA/NDPR-compliant safeguards.
                    </li>
                    <li>
                        Publish a short privacy summary (in plain language) on booking pages
                        and link to the full Privacy Policy.
                    </li>
                    <li>
                        Configure a cookie banner and consent capture on the website or app.
                    </li>
                    <li>
                        Ensure CCTV signage in vehicles and display a privacy notice on
                        drivers’ tablets or printed manifests.
                    </li>
                    <li>
                        Record retention schedules and maintain a secure deletion
                        procedure.
                    </li>
                    <li>
                        Train staff on handling Subject Access Requests (SARs), breach
                        response, and limiting internal access to personal data.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">
                    2. Retention & Example Table
                </h2>

                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border border-gray-300 text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2 font-semibold">Data Category</th>
                                <th className="border p-2 font-semibold">Typical Retention</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">Booking & Invoices</td>
                                <td className="border p-2">7 years</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Transaction Logs (Payments)</td>
                                <td className="border p-2">7 years (as per accounting)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">CCTV Footage</td>
                                <td className="border p-2">30–90 days (extended if incident)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Support & Complaint Records</td>
                                <td className="border p-2">2–3 years</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Driver Vetting Files</td>
                                <td className="border p-2">7 years</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Marketing Consent Logs</td>
                                <td className="border p-2">Until withdrawn</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-xl font-semibold mb-2">
                    3. Privacy Summary (For Booking Page / App)
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                    <h3 className="font-semibold text-lg mb-2">
                        Your Privacy Matters to Us
                    </h3>
                    <p className="mb-3">
                        At U-Flex Shuttle Services, we collect only the information we need
                        to get you safely to your destination — such as your name, contact
                        details, pickup and drop-off points, and payment information. We may
                        also use GPS and in-vehicle security cameras to ensure the safety of
                        passengers and drivers.
                    </p>

                    <p className="mb-3">
                        We never sell your data. We share it only with trusted partners
                        (e.g., payment processors or airlines) when necessary for your
                        booking, safety, or legal compliance.
                    </p>

                    <p className="mb-3">
                        You’re in control: you can access your data, update it, ask us to
                        delete it, or opt out of marketing at any time.
                    </p>

                    <p className="mb-3">
                        For full details, see our{" "}
                        <a
                            href="/policy"
                            className="text-blue-600 underline font-medium"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>

                    <p className="mb-1">
                        <strong>Contact:</strong>{" "}
                        <a
                            href="mailto:uflexshuttleservices@gmail.com"
                            className="text-blue-600 underline"
                        >
                            uflexshuttleservices@gmail.com
                        </a>
                        <br />
                        <strong>Facebook/IG:</strong> uflex shuttleservice <br />
                        <strong>Phone:</strong> 08112159041 / 07073756792
                    </p>
                </div>

                <p className="text-sm text-gray-500 text-center mt-8">
                    Schedule A — Issued by Management, U-Flex Shuttle Services
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default ScheduleA;
