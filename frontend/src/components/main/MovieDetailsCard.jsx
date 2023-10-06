import PropTypes from 'prop-types';

const MovieDetailsCard = ({movie, onClose}) => {
    const runningTime = movie.runningTime;
    const hours = Math.floor(runningTime / 3600000);
    const minutes = Math.floor((runningTime % 3600000) / 60000);
    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
                <img src="https://via.placeholder.com/300x450" alt={movie.title} className="w-full" />
            </div>
            <div className="md:w-2/3 md:pl-4">
                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-700 mb-4">{movie.description}</p>
                <p className="mb-2">Running time: {hours} hours {minutes} minutes</p>
                <button onClick={onClose} className="bg-gray-800 text-white py-2 px-4 rounded-md mt-4">Close</button>
            </div>
        </div>
    );
};

MovieDetailsCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        runningTime: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

export default MovieDetailsCard;