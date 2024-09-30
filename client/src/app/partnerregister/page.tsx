'use client'
import React, { useState } from 'react';
import axios from 'axios';
require("dotenv").config();

const RestaurantRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/auth/restaurant/register`, formData);
      setSuccess(response.data.message);
      // Reset form after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
      });
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
  <h2 className="text-2xl font-semibold mb-6 text-center">Register Restaurant</h2>
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Register
    </button>
  </form>
  {error && <p className="text-red-500 text-center">{error}</p>}
  {success && <p className="text-green-500 text-center">{success}</p>}
</div>

  );
};

export default RestaurantRegister;
