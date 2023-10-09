import React from 'react';
import {useNavigate} from 'react-router-dom';

const NoUser = (name) => {
	const navigate = useNavigate();

	return (
		<div className='flex flex-col items-center justify-center'>
			<h1 className='lg:text-xl text-base m-2 font-bold mb-8'>
				Please login or register to {name}
			</h1>
			<div className='flex flex-col items-center'>
				<button
					className='button mb-5'
					onClick={() => navigate('/login')}>
					Login
				</button>
				<button
					className='button'
					onClick={() => navigate('/register')}>
					Register
				</button>
			</div>
		</div>
	);
};

export default NoUser;
