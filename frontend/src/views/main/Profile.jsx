import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FlagIcon } from 'react-flag-kit';

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='container mx-auto mt-4 p-4 border rounded shadow-lg'>
      <h1 className='text-2xl font-semibold mb-4'>Profile</h1>
      {user && (
        <div>
          <p className='mb-2'>
            <span className='font-semibold'>Name:</span> {user.name}
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Email:</span> {user.email}
          </p>
          <FlagIcon
            code={user.countryid.toUpperCase()}
            className='ml-2'
            alt={`Flag for ${user.countryid}`}
            size={240}
          />
          <div className='mt-4 space-x-4'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>
              Edit Profile
            </button>
            <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'>
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
