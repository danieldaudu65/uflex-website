import React, { useState,  } from 'react';
import type { ChangeEvent } from 'react';
import type { FormEvent } from 'react';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-2xl mx-auto  mt-10 p-2 bg-white rounded-lg shadow-md">
      {/* <h2 className="text-2xl font-bold mb-6 text-green-main">Contact Us</h2> */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col flex-1 relative">
            <label className="font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col flex-1 relative">
            <label className="font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col relative">
          <label className="font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col relative">
          <label className="font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col relative">
          <label className="font-medium mb-1">Service Needed</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
          >
            <option value="">Select a service</option>
            <option value="web-design">Web Design</option>
            <option value="app-development">App Development</option>
            <option value="seo">SEO</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <div className="flex flex-col relative">
          <label className="font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows={5}
            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-green-main hover:bg-green-secondary text-white font-medium py-2 px-4 rounded-md mt-2"
        >
          Submit
        </button>

      </form>
    </div>
  );
};

export default ContactUs;
