import React, { useState } from 'react';
import { postSchedule } from '../../hooks/ApiHooks';
const CreateSchedules = () => {
  const [formData, setFormData] = useState({
    day: '',
    time: '',
    title: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendScheduleData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      // Create an array of schedule items from the state
      const scheduleData = {
        day: formData.day,
        schedule: [
          {
            time: formData.time,
            title: formData.title,
          },
        ],
      };
      const schedulePostResponse = await postSchedule(scheduleData, token);
      console.log(schedulePostResponse);
      // Send a POST request to your backend with the scheduleData using fetch
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.log(error.message);
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
          onClick={sendScheduleData} // Call sendScheduleData when the button is clicked
          className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded'
        >
          Save Schedule
        </button>
      </div>
    </div>
  );
};

export default CreateSchedules;
