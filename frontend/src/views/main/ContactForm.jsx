import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const ContactForm = () => {
  const { user } = useContext(UserContext);

  // Use the "||" operator for default values to simplify the initial state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log(formData);

    // Clear the form after submission (optional)
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow-md rounded-md'>
      <h2 className='text-xl font-semibold mb-4'>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-gray-600 font-medium mb-2'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full p-2 border rounded-md outline-none'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-600 font-medium mb-2'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2 border rounded-md outline-none'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='message'
            className='block text-gray-600 font-medium mb-2'
          >
            Message
          </label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows='4'
            className='w-full p-2 border rounded-md outline-none'
            required
          ></textarea>
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
