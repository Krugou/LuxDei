import React, {useEffect, useState} from 'react';
import {getSchedule} from '../../hooks/ApiHooks';
const Schedule = () => {
    const [scheduleData, setScheduleData] = useState([]);
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
    return (
        <div className='bg-white container mx-auto p-6 md:p-10 m-4'>
            <h1 className="text-2xl md:text-4xl font-bold ">Festival Schedule</h1>
            <p className="text-base md:text-lg mt-4">
                Explore the exciting lineup of films, events, and screenings scheduled for the Jakfilms Festival.
                Plan your festival experience and make sure you don't miss out on any of the fantastic films and activities.
            </p>
            <div className="mt-6">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">Time</th>
                            <th className="px-4 py-2">Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleData.map((dayData, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className="border px-4 py-2 font-semibold">{dayData.day}</td>
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2"></td>
                                </tr>
                                {dayData.schedule.map((eventData, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2"></td>
                                        <td className="border px-4 py-2">{eventData.time}</td>
                                        <td className="border px-4 py-2">{eventData.title}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Schedule;
