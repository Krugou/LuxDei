import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FlagIcon } from 'react-flag-kit';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../hooks/ApiHooks';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { deleteUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const deleteResponse = await deleteUser(token);
      console.log(deleteResponse);
      navigate('/logout');
    } catch (error) {
      console.log(error.message);
    }

    // Handle the profile deletion here
    // You can make an API call to delete the profile
    // or perform any other necessary actions
    // After deletion, you can navigate to a different page
    // or update the user context as needed

    closeDeleteModal();
  };

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
            className='ml-2 mt-7 mb-7'
            alt={`Flag for ${user.countryid}`}
            size={240}
          />
          <div className='mt-4 flex justify-between space-x-4'>
            <button className='button'>
              Edit Profile
            </button>
            <button
              onClick={openDeleteModal}
              className='button'
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}

      {/* Delete Profile Modal */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white w-1/2 p-4 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Confirm Deletion</h2>
            <p>Are you sure you want to delete your profile?</p>
            <div className='mt-4 space-x-4'>
              <button
                onClick={handleDeleteProfile}
                className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
