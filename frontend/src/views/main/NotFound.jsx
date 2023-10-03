import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/');
        }, 10000);

        return () => {
            clearTimeout(timeoutId);
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
        </div>
    );
};

export default NotFound;