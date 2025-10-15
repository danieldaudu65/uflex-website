import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { apiRequest } from '../utils/api';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  otherService?: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    otherService: '',
    message: ''
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const payload = {
      ...formData,
      service:
        formData.service === 'others'
          ? formData.otherService || 'Others'
          : formData.service,
      user_id: user?._id || nanoid(),
      user_name: user
        ? `${user.firstName} ${user.lastName}`
        : `${formData.firstName} ${formData.lastName}`,
      user_email: user?.email || formData.email,
    };

    try {
      const data = await apiRequest('/user_report/reports', 'POST', payload);

      if (data.success) {
        toast.success('Complaint submitted successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          otherService: '',
          message: ''
        });
      } else {
        toast.error(data.message || 'Failed to submit complaint');
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Server error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-2 bg-white rounded-lg shadow-md">
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
            <option value="airport-pickup">Airport Pickup</option>
            <option value="airport-dropoff">Airport Dropoff</option>
            <option value="car-rental">Car Rental</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* ✅ Show this only if user selected “Others” */}
        {formData.service === 'others' && (
          <div className="flex flex-col relative">
            <label className="font-medium mb-1">Please specify or verify</label>
            <input
              type="text"
              name="otherService"
              value={formData.otherService}
              onChange={handleChange}
              placeholder="Describe the service you need"
              className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
            />
          </div>
        )}

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
