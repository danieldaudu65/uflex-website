import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ig, logo, tiktok, X, Link } from "../assets";

const Footer = () => {
  return (
    <footer className="p-6 mt-1 bg-gray-50 border-t border-gray-200">
      {/* Logo + Description */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div>
          <img src={logo} alt="U-Flex Logo" className="h-10 w-auto" />
          <div className="text-sm space-y-2 mt-4 max-w-sm text-gray-700">
            <p>Get fast and trusted rides near you.</p>
            <p className="font-medium">+234 707 375 792</p>
            <p>© All Rights Reserved. 2025, U-Flex Shuttle Services Ltd</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-sm">
          <RouterLink to="/resources" className="text-gray-600 hover:text-green-main">
            Resources
          </RouterLink>
          <RouterLink to="/services" className="text-gray-600 hover:text-green-main">
            Services
          </RouterLink>
          <RouterLink to="/about" className="text-gray-600 hover:text-green-main">
            About
          </RouterLink>
          <RouterLink to="/contact" className="text-gray-600 hover:text-green-main">
            Contact Us
          </RouterLink>
        </div>

        {/* Socials */}
        <div>
          <p className="opacity-70 text-xs mb-2">Follow us on Socials</p>
          <div className="flex gap-3">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={Link} alt="LinkedIn" className="h-6 w-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={ig} alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={X} alt="X (Twitter)" className="h-6 w-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={tiktok} alt="TikTok" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
