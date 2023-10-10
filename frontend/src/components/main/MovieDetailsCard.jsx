import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import LoadingSpinner from '../LoadingSpinner';
import LikesElement from './LikesElement';

const MovieDetailsCard = ({ movie, onClose, loadStatus }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const runningTime = movie.runningTime;
  const hours = Math.floor(runningTime / 3600000);
  const minutes = Math.floor((runningTime % 3600000) / 60000);
  const seconds = Math.floor((runningTime % 60000) / 1000);

  useEffect(() => {
    // Simulate loading delay for demonstration purposes.
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Replace this with your actual image loading logic.
  }, []);

  return (
    <>
      {isLoading || loadStatus === 'loading' ? (
        <div className='w-full h-full flex items-center justify-center'>
          <LoadingSpinner />
        </div>
      ) : (
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/3'>
            <img src={movie.img} alt={movie.title} className='w-full' />
          </div>
          <div className='md:w-2/3 md:pl-4'>
            <h2 className='text-2xl font-bold mb-2'>{movie.title}</h2>
            <p className='text-gray-700 mb-4'>{movie.description}</p>
            {runningTime > 0 && (
              <p className='mb-2'>
                Running time:
                {hours > 0 && ` ${hours} hours`}
                {minutes > 0 && ` ${minutes} minutes`}
                {seconds > 0 && ` ${seconds} seconds`}
              </p>
            )}
            <LikesElement user={user} location={movie.title} />
            <button onClick={onClose} className='button mt-5'>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

MovieDetailsCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    runningTime: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  loadStatus: PropTypes.oneOf(['loading', 'loaded']).isRequired,
};

export default MovieDetailsCard;
