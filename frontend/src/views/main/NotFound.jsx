import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            navigate('/');
        }, 5000);

        const resetTimeout = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                navigate('/');
            }, 5000);
        };

        window.addEventListener('mousemove', resetTimeout);
        window.addEventListener('keydown', resetTimeout);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('mousemove', resetTimeout);
            window.removeEventListener('keydown', resetTimeout);
        };
    }, [navigate]);

    return (
        <div className='bg-alepurple container mx-auto p-4 md:p-10 m-4'>
            <h1 className='text-2xl md:text-4xl font-bold mybasetext' aria-live='assertive'>
                404 - Page Not Found
            </h1>
            <p className='text-base md:text-lg mybasetext mt-2 md:mt-4' aria-label='Error message'>
                Oops! The page you are looking for does not exist.
            </p>
            <p className='text-base md:text-lg mybasetext mt-2 md:mt-4' aria-label='Instructions'>
                It seems like you've taken a wrong turn. Please check the URL or navigate back to the home page.
            </p>
            <div className='flex justify-center mt-4'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4' onClick={() => navigate('/')}>
                    Home
                </button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => navigate('/about')}>
                    About
                </button>
            </div>
        </div>
    );
};

export default NotFound;