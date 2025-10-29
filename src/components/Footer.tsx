import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ig, logo, tiktok,  fb, wp } from "../assets";

const Footer: React.FC = () => {
  return (
    <footer className="p-6 md:p-10 mt-1 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Main layout */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo + Description */}
          <div className="flex-1">
            <img src={logo} alt="U-Flex Logo" className="h-10 md:h-12 w-auto" />
            <div className="text-sm md:text-base space-y-2 mt-4 max-w-sm text-gray-700">
              <p>Get fast and trusted rides near you.</p>
              <p className="font-semibold text-gray-900">+234 707 375 6792</p>
              <p className="font-semibold text-gray-900">+234 811 215 9041</p>
              <p className="text-xs md:text-sm text-gray-500">
                © 2025 U-Flex Shuttle Services Ltd. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex-1 md:flex md:justify-center">
            <div className="flex flex-col gap-2 text-sm md:text-base text-center md:text-left">
              <RouterLink
                to="/blog"
                className="text-gray-600 hover:text-green-main transition-colors"
              >
                Blog
              </RouterLink>
              {/* <RouterLink
                to="/services"
                className="text-gray-600 hover:text-green-main transition-colors"
              >
                Services
              </RouterLink> */}
              <RouterLink
                to="/about"
                className="text-gray-600 hover:text-green-main transition-colors"
              >
                About
              </RouterLink>
              <RouterLink
                to="/contact"
                className="text-gray-600 hover:text-green-main transition-colors"
              >
                Contact Us
              </RouterLink>
            </div>
          </div>

          {/* Socials */}
          <div className="flex-1 md:flex md:justify-end">
            <div>
              <p className="opacity-70 text-xs md:text-sm mb-3 text-gray-600">
                Follow us on Socials
              </p>
              <div className="flex gap-3 md:gap-4">
                <a
                  href="https://www.facebook.com/share/17Lj6eKUYm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img src={fb} alt="LinkedIn" className="h-6 w-6 md:h-7 md:w-7" />
                </a>
                <a
                  href="https://www.instagram.com/uflexshuttleservice?utm_source=qr&igsh=dDd3aHpkdXBwaTJi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img src={ig} alt="Instagram" className="h-6 w-6 md:h-7 md:w-7" />
                </a>
                <a
                  href="https://wa.me/234707375792"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img src={wp} alt="X (Twitter)" className="h-6 w-6 md:h-7 md:w-7" />
                </a>
                <a
                  href="https://www.tiktok.com/@uflexshuttleservi?_t=ZS-90XWbLQZmPS&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img src={tiktok} alt="TikTok" className="h-6 w-6 md:h-7 md:w-7" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider line + Bottom text (optional on larger screens) */}
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs md:text-sm text-gray-500">
          Built with ❤️ by U-Flex Dev Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;
