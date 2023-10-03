import React from 'react';

const Schedule = () => {
    const scheduleData = [
        {
            "day": "Day 1 - Opening Night",
            "schedule": [
                {
                    "time": "5:00 PM",
                    "title": "Red Carpet Arrival"
                },
                {
                    "time": "7:00 PM",
                    "title": "Opening Film: \"The Grand Premiere\""
                },
                {
                    "time": "9:30 PM",
                    "title": "Welcome Reception"
                }
            ]
        },
        {
            "day": "Day 2 - Spotlight Films",
            "schedule": [
                {
                    "time": "10:00 AM",
                    "title": "\"Cinematic Wonders\" Documentary"
                },
                {
                    "time": "1:30 PM",
                    "title": "\"A Journey Through Time\" Panel Discussion"
                },
                {
                    "time": "4:00 PM",
                    "title": "\"Director's Vision\" Q&A Session"
                },
                {
                    "time": "7:30 PM",
                    "title": "Spotlight Film: \"The Masterpiece\""
                }
            ]
        },
        {
            "day": "Day 3 - Closing Day",
            "schedule": [
                {
                    "time": "11:00 AM",
                    "title": "Film Workshop: \"Behind the Scenes\""
                },
                {
                    "time": "2:00 PM",
                    "title": "Award Ceremony: \"Best of the Fest\""
                },
                {
                    "time": "5:30 PM",
                    "title": "Closing Film: \"The Farewell\""
                },
                {
                    "time": "8:00 PM",
                    "title": "Farewell Party"
                }
            ]
        }
    ];
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