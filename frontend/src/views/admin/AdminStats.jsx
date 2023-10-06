import React, {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';

const AdminStats = () => {

    const navigate = useNavigate();
    const name = 'newarticle';
    const name2 = 'newschedule';
    
    return (

        <div>
            <h1>Admin Stats</h1>
            <button
                onClick={() => {
                    navigate(`./${name}`);
                }}
                className='mx-3 text-sm sm:text-xl text-black transition hover:text-gray-300'
                aria-label={`Go to ${name}`}
                title={`Go to ${name}`}
            >
                {name}
            </button>
            <button
                onClick={() => {
                    navigate(`./${name2}`);
                }}
                className='mx-3 text-sm sm:text-xl text-black transition hover:text-gray-300'
                aria-label={`Go to ${name2}`}
                title={`Go to ${name2}`}
            >
                {name2}
            </button>
        </div>
    );
};

export default AdminStats;
