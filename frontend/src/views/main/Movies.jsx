import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import MovieDetailsCard from '../../components/main/MovieDetailsCard';
import { getFestivalMovies } from '../../hooks/ApiHooks';
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadStatus, setLoadStatus] = useState('loading');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getFestivalMovies();
        setMovies(data);
        setLoadStatus('loaded');
      } catch (e) {
        console.error(e);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      {loadStatus === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <div className='container pb-5 pt-5 mx-auto'>
          <h1 className='text-3xl font-bold mt-6 text-center'>Movie List</h1>
          <input
            type='text'
            placeholder='Search movies...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='border border-gray-400 rounded-md px-4 py-2 mb-4'
          />
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-gmgold gap-4'>
            {filteredMovies.map((movie) => (
              <li
                key={movie.id}
                onClick={() => handleMovieSelect(movie)}
                className='bg-white rounded-lg shadow-md overflow-hidden'
              >
                <div className='p-4'>
                  <h2 className='text-xl font-bold mb-2'>{movie.title}</h2>
                  <p className='text-gray-700'>{movie.description}</p>
                </div>
              </li>
            ))}
          </ul>
          {isModalOpen && (
            <div
              className='fixed inset-0 z-50 flex items-center justify-center'
              onClick={handleModalClose}
            >
              <div className='absolute inset-0 bg-gray-900 opacity-50'></div>
              <div
                className='bg-white rounded-lg shadow-lg z-10 overflow-y-auto sm:w-8/12 lg:w-9/12 w-11/12'
                onClick={handleModalClose}
              >
                <div className='p-4'>
                  <button
                    onClick={handleModalClose}
                    className='absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none'
                  >
                    <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
                      <path d='M18.3 5.7c-.4-.4-1-.4-1.4 0L12 10.6 7.1 5.7c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4L10.6 12l-4.9 4.9c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3L12 13.4l4.9 4.9c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l4.9-4.9c.4-.4.4-1 0-1.4z' />
                    </svg>
                  </button>
                  <MovieDetailsCard
                    movie={selectedMovie}
                    onClose={handleModalClose}
                    loadStatus={loadStatus}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Movies;
