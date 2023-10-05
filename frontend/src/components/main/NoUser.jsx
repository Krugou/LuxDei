import React from 'react';
import {useNavigate} from 'react-router-dom';

const NoChat = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl m-2 font-bold mb-8'>
                Please login or register to chat
            </h1>
            <div className='flex flex-col items-center'>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => navigate('/register')}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default NoChat;