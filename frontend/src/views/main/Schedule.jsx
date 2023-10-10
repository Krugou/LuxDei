import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar'; // import the Calendar component
import {getSchedule} from '../../hooks/ApiHooks';

const Schedule = () => {
	const [scheduleData, setScheduleData] = useState([]);
	const [date, setDate] = useState(new Date()); // add a state variable for the selected date

	useEffect(() => {
		const fetchSchedule = async () => {
			try {
				const data = await getSchedule();
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
		<div className='bg-white container mx-auto p-6 md:p-10 m-4'>
			<h1 className='text-2xl md:text-4xl font-bold '>Festival Schedule</h1>
			<p className='text-base md:text-lg mt-4'>
				Explore the exciting lineup of films, events, and screenings scheduled
				for the Jakfilms Festival. Plan your festival experience and make sure
				you don't miss out on any of the fantastic films and activities.
			</p>
			<div className='mt-6'>
				<Calendar
					onChange={handleDateChange}
					value={date}
				/>
				{scheduleData
					.filter(
						(dayData) =>
							new Date(dayData.day).toDateString() === date.toDateString()
					)
					.map((dayData, index) => (
						<React.Fragment key={index}>
							<div>
								<h2>{dayData.day}</h2>
								<p>Time: {dayData.time}</p>
								<p>Event: {dayData.event}</p>
							</div>
						</React.Fragment>
					))}
			</div>
		</div>
	);
};

export default Schedule;
