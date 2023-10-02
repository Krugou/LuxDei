import React from 'react';

const EventDetails = () => {
    return (
        <div className="bg-gray-100 min-h-50">

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            src="https://static.onecms.io/wp-content/uploads/sites/6/2015/06/movie-theater-line_0.jpg"
                            alt="Jakfilms"
                            className="w-full h-auto  rounded-lg"
                        />

                    </div>
                    <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Festival</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            The JakFilms Festival is an annual online event that celebrates the best in independent
                            filmmaking from around the world. The festival features screenings of short and feature
                            films, as well as panel discussions, workshops, and networking events for filmmakers and
                            film enthusiasts.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Whether you're a filmmaker looking to showcase your work, or a film lover looking for the next big thing, the Jakfilms Festival is the place to be. Join us online for three days of cinematic excellence!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
