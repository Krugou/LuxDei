import React from 'react';

const MovieDetailsCard = ({movie}) => {
    const {title, runningTime, description} = movie;
    const hours = Math.floor(runningTime / 3600000);
    const minutes = Math.floor((runningTime % 3600000) / 60000);

    return (
        <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="md:w-1/3">
                <img src="https://via.placeholder.com/300x450" alt={title} className="w-full" />
            </div>
            <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="mb-2">Running time: {hours} hours {minutes} minutes</p>
                <p className="mb-4">{description}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Buy tickets
                </button>
            </div>
        </div>
    );
};

export default MovieDetailsCard;