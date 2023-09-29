import React from 'react';

const NavUpperElement = () => {
    return (
        <div className='bg-black w-full h-6 flex flex-row justify-between text-white'>
            <div className='text-left'>

                <span className='mx-4 my-2'>JakFilms</span>

            </div>
            <div className='text-right'>
                <span className='mx-4 my-2'>Login</span>
                <span className='mx-4 my-2'>Register</span>
            </div>

        </div>
    );
};

export default NavUpperElement;

