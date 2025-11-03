import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PolicyPage:React.FC = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 leading-relaxed">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Privacy Policy — U-Flex Shuttle Services
        </h1>

        <p className="mb-4">
          U-Flex Shuttle Services (otherwise referred to as “we”, “our”, “us”)
          operates passenger shuttle and airport chauffeur services. We are
          committed to protecting the privacy and security of personal
          information we collect from customers, passengers, drivers, and other
          third parties.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Introduction / Purpose</h2>
        <p className="mb-4">
          This Policy explains what personal data we collect, why we collect it,
          how we use and store it, and the rights individuals have regarding
          their information. It applies to data collected through our website,
          phone bookings, vehicle CCTV/telemetry, in-person interactions, and
          third-party sources.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Controller / Contact Information</h2>
        <p className="mb-4">
          <strong>Data Controller:</strong> U-Flex Shuttle Services <br />
          <strong>Office:</strong> Kiko American Way, Plot No. 62010, Zone
          MD/A38, Ebo-Irhirhi/Ogba, Oredo LGA, Benin City. <br />
          <strong>DPO:</strong> Peace <br />
          <strong>Email:</strong> uflexshuttleservices@gmail.com <br />
          <strong>Phone:</strong> 08112159041 / 07073756792 <br />
          <strong>Facebook/IG:</strong> uflex shuttleservice
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Legal & Regulatory Framework</h2>
        <p className="mb-4">
          We process personal data in line with Nigeria’s data protection laws,
          including the Nigeria Data Protection Act 2023 and the NDPR. We
          implement technical and organisational measures to ensure compliance
          and respect for individuals’ rights.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Definitions</h2>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          <li>
            <strong>Personal data:</strong> Any information that identifies an
            individual.
          </li>
          <li>
            <strong>Special personal data:</strong> Sensitive information such as
            health, biometric, or criminal record data.
          </li>
          <li>
            <strong>Data controller:</strong> We determine how and why data is
            processed.
          </li>
          <li>
            <strong>Data processor:</strong> Third parties processing data on our
            behalf.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          5. Categories of Personal Data We Collect
        </h2>
        <p className="mb-4">
          We collect identity, contact, booking, payment, identification,
          location, CCTV, and communication data for service, security, and
          compliance purposes.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          6. How We Collect Personal Data
        </h2>
        <p className="mb-4">
          Data is collected directly, automatically (cookies, GPS, CCTV), or via
          third parties such as payment processors, travel agents, or
          law-enforcement authorities.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          7. Purposes of Processing & Lawful Bases
        </h2>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          <li>To perform the transport contract (Lawful basis: Contract)</li>
          <li>Payment processing (Lawful basis: Contract, Legal obligation)</li>
          <li>Safety & security (Lawful basis: Legitimate interest)</li>
          <li>Regulatory compliance (Lawful basis: Legal obligation)</li>
          <li>Fraud prevention (Lawful basis: Legitimate interest)</li>
          <li>Customer support (Lawful basis: Contract)</li>
          <li>Marketing (Lawful basis: Consent)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          8. Cookies, Analytics & Tracking
        </h2>
        <p className="mb-4">
          We use cookies for essential website operations and analytics. You can
          manage preferences through your browser or our cookie banner.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          9. CCTV & In-Vehicle Recording
        </h2>
        <p className="mb-4">
          Vehicle CCTV and audio are used for safety and incident investigations.
          Recordings are accessed by authorised staff only and retained for 30–90
          days unless legally required longer.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          10. Sharing & Disclosure
        </h2>
        <p className="mb-4">
          We share data with processors, law enforcement, insurers, and advisors
          where required. All third parties operate under confidentiality and
          security obligations.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          11. International Transfers
        </h2>
        <p className="mb-4">
          Some processing occurs outside Nigeria under proper contractual and
          technical safeguards.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">12. Data Retention</h2>
        <p className="mb-4">
          Data is retained only as long as necessary:
          <br />
          • Bookings & invoices: 7 years
          <br />
          • CCTV footage: 30–90 days
          <br />
          • Support logs: 1–3 years
          <br />
          • Driver vetting: 7 years
          <br />
          • Marketing consent: until withdrawn
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">13. Security Measures</h2>
        <p className="mb-4">
          We use role-based access, encryption, MFA, secure servers, and staff
          training to protect data.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">14. Children’s Data</h2>
        <p className="mb-4">
          We do not knowingly collect children’s data without verified parental
          consent.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">15. Your Rights</h2>
        <p className="mb-4">
          You may access, rectify, delete, or restrict your data, withdraw
          consent, or lodge complaints with the NDPC.
          <br />
          Contact:{" "}
          <a
            href="mailto:uflexshuttleservices@gmail.com"
            className="text-blue-600 underline"
          >
            uflexshuttleservices@gmail.com
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">16. Data Breach Notification</h2>
        <p className="mb-4">
          In case of a breach, we will notify affected individuals and the NDPC
          as required by law.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">17. Marketing & Opt-Out</h2>
        <p className="mb-4">
          We send marketing only with consent. You can unsubscribe at any time.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">18. Third-Party Links</h2>
        <p className="mb-4">
          Our site may link to third-party sites. Please review their privacy
          policies separately.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">19. Changes to This Policy</h2>
        <p className="mb-4">
          Updates will be posted on our website. Major changes will be
          communicated via email.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">20. Complaints & Contact</h2>
        <p className="mb-4">
          DPO: Peace <br />
          Email: uflexshuttleservices@gmail.com <br />
          Phone: 08112159041 / 07073756792 <br />
          Address: Kiko American Way, Plot No. 62010, Zone MD/A38, Ebo-Irhirhi/Ogba, Benin City.
        </p>

        <p className="mt-8 text-sm text-gray-500 text-center">
          Signed: Management — U-Flex Shuttle Services
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyPage;