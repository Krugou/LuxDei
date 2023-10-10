import React, { useState } from 'react';

const CreateArticles = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here, e.g., send data to the server
    // Reset the form
    setFormData({
      title: '',
      content: '',
    });
  };

  return (
    <div className='max-w-2xl mx-auto mt-8 p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Create Article</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-gray-700 font-bold mb-2'>Title</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            className='w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter the title'
          />
        </div>
        <div>
          <label className='block text-gray-700 font-bold mb-2'>Content</label>
          <textarea
            name='content'
            value={formData.content}
            onChange={handleInputChange}
            className='w-full h-40 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter the content'
          />
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticles;
