import {useState, useEffect} from 'react';
import MovieDetailsCard from '../../components/main/MovieDetailsCard';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Set movies data from constant array
        const fakeMovies = [
            {
                id: 1, title: 'The Shawshank Redemption',
                runningTime: 8520000, // 2 hours and 22 minutes in milliseconds
                description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
            },
            {
                id: 2, title: 'The Godfather',
                runningTime: 10500000, // 2 hours and 55 minutes in milliseconds
                description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
            },
            {
                id: 3, title: 'The Godfather: Part II',
                runningTime: 12120000, // 3 hours and 22 minutes in milliseconds
                description: 'The early life and career of Vito Corleone in 1920s New York City are portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.'
            },
            {
                id: 4, title: 'The Dark Knight',
                runningTime: 9120000, // 2 hours and 32 minutes in milliseconds
                description: 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
            },
            {
                id: 5, title: '12 Angry Men',
                runningTime: 5760000, // 1 hour and 36 minutes in milliseconds
                description: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.'
            },
            {
                id: 6, title: "Schindler's List",
                runningTime: 11700000, // 3 hours and 15 minutes in milliseconds
                description: 'In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.'
            },
            {
                id: 7, title: 'The Lord of the Rings: The Return of the King',
                runningTime: 12060000, // 3 hours and 21 minutes in milliseconds
                description: 'Gandalf and Aragorn lead the World of Men against Sauron’s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.'
            },
            {
                id: 8, title: 'Pulp Fiction',
                runningTime: 9264000, // 2 hours and 34 minutes in milliseconds
                description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
            },
            {
                id: 9, title: 'The Good, the Bad and the Ugly',
                runningTime: 10680000, // 2 hours and 58 minutes in milliseconds
                description: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.'
            },
            {
                id: 10, title: 'Fight Club',
                runningTime: 8352000, // 2 hours and 19 minutes in milliseconds
                description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.'
            }
        ];
        setMovies(fakeMovies);
    }, []);
    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Movie List</h1>
            <input type="text" placeholder="Search movies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-400 rounded-md px-4 py-2 mb-4" />
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMovies.map(movie => (
                    <li key={movie.id} onClick={() => handleMovieSelect(movie)} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                            <p className="text-gray-700">{movie.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleModalClose}>
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="bg-white rounded-lg shadow-lg z-10 overflow-y-auto" onClick={handleModalClose}>
                        <div className="p-4">
                            <button onClick={handleModalClose} className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.3 5.7c-.4-.4-1-.4-1.4 0L12 10.6 7.1 5.7c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4L10.6 12l-4.9 4.9c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3L12 13.4l4.9 4.9c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l4.9-4.9c.4-.4.4-1 0-1.4z" />
                                </svg>
                            </button>
                            <MovieDetailsCard movie={selectedMovie} onClose={handleModalClose} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movies;