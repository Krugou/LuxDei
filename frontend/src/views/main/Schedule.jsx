import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'; // import the Calendar component
import 'react-calendar/dist/Calendar.css'; // import the Calendar component's styles
import { getSchedule } from '../../hooks/ApiHooks';
const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [date, setDate] = useState(new Date()); // add a state variable for the selected date

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getSchedule();
        // console.log(data);
        setScheduleData(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchSchedule();
  }, []);

  const handleDateChange = (date) => {
    // add a handler for date changes
    setDate(date);
  };

  return (
    <div className='bg-gray-100 container mx-auto p-6 md:p-10 m-4'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>
        Festival Schedule
      </h1>
      <p className='text-base md:text-lg mt-4 text-center'>
        Explore the exciting lineup of films, events, and screenings scheduled
        for the Jakfilms Festival. Plan your festival experience and make sure
        you don't miss out on any of the fantastic films and activities.
      </p>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Calendar
          onChange={handleDateChange}
          value={date}
          className='w-full'
          tileContent={({ date, view }) => {
            // Check if the date has data
            const hasData = scheduleData.some(
              (dayData) =>
                new Date(dayData.day).toDateString() === date.toDateString()
            );

            // If the date has data and the view is 'month', change the background color to purple
            return view === 'month' && hasData ? (
              <div className=' bg-gmdeepblack h-full w-full'></div>
            ) : null;
          }}
        />
        {scheduleData
          .filter(
            (dayData) =>
              new Date(dayData.day).toDateString() === date.toDateString()
          )
          .map((dayData, index) => (
            <React.Fragment key={index}>
              <h2 className='text-lg md:text-xl font-bold'>
                {dayData.day.toDateString()}
              </h2>
              {dayData.schedule.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className='p-4 border rounded shadow bg-white'
                >
                  <p className='font-bold'>Time: {event.time}</p>
                  <p>Event: {event.title}</p>
                </div>
              ))}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Schedule;
