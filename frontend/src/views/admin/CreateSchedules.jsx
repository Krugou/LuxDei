import React, { useState } from 'react';

const CreateSchedules = () => {
  const [formData, setFormData] = useState({
    day: '',
    time: '',
    title: '',
  });

  const [scheduleItems, setScheduleItems] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddScheduleItem = () => {
    if (formData.time && formData.title) {
      setScheduleItems([...scheduleItems, formData]);
      setFormData({
        ...formData,
        time: '',
        title: '',
      });
    }
  };

  return (
    <div className='max-w-xl mx-auto mt-8 p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Create Schedule</h2>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Day</label>
        <input
          type='text'
          name='day'
          value={formData.day}
          onChange={handleInputChange}
          className='w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Enter the day'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Time</label>
        <input
          type='text'
          name='time'
          value={formData.time}
          onChange={handleInputChange}
          className='w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Enter the time'
        />
      </div>
      <div className='mb-4'>
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
      <div className='mb-4'>
        <button
          type='button'
          onClick={handleAddScheduleItem}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
        >
          Add Schedule Item
        </button>
      </div>
      <div>
        <h3 className='text-xl font-semibold mb-2'>Schedule Items:</h3>
        <ul>
          {scheduleItems.map((item, index) => (
            <li key={index} className='mb-2'>
              <strong>{item.day}:</strong> {item.time} - {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateSchedules;
