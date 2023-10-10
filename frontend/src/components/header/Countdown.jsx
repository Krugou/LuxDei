import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Countdown = ({unixTime}) => {
	const navigate = useNavigate();

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

		let formattedTime = '';

		if (days > 0) {
			formattedTime += `${days.toString().padStart(2, '0')}:`;
		}
		if (hours > 0) {
			formattedTime += `${hours.toString().padStart(2, '0')}:`;
		}
		if (minutes > 0) {
			formattedTime += `${minutes.toString().padStart(2, '0')}:`;
		}
		if (seconds > 0) {
			formattedTime += `${seconds.toString().padStart(2, '0')}`;
		}

		return formattedTime;
	};

	return (
		<>
			{timeLeft > 0 ? (
				<div
					className='bg-gmgold rounded-md p-2 cursor-pointer hover:bg-gmneonyellow'
					onClick={() => {
						navigate('/livestream');
					}}>
					<p className='text-sm sm:text-2xl text-center text-gmdeepblack font-bold '>
						Time left until showtime: {formatTime(timeLeft)} - Click to tune in
						live:
					</p>
				</div>
			) : (
				''
			)}
		</>
	);
};
Countdown.propTypes = {
	unixTime: PropTypes.number.isRequired,
};

export default Countdown;
