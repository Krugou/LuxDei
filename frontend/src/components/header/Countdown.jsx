import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
const Countdown = (unixTime) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            const secondsLeft = unixTime - now;
            setTimeLeft(secondsLeft);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [unixTime]);

    const formatTime = (time) => {
        const days = Math.floor(time / 86400);
        const hours = Math.floor((time % 86400) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-gray-100 rounded-md p-2">
            {timeLeft > 0 ? (
                <p className="text-2xl text-center text-black font-bold">
                    Time left until showtime: {formatTime(timeLeft)}
                </p>
            ) : (
                <p className="text-2xl font-bold"></p>
            )}
        </div>
    );
};
Countdown.PropTypes = {
    unixTime: PropTypes.number.isRequired,
};


export default Countdown;