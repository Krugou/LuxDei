import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FlagIcon } from 'react-flag-kit';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteProfile = () => {
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
            className='ml-2'
            alt={`Flag for ${user.countryid}`}
            size={240}
          />
          <div className='mt-4 space-x-4'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>
              Edit Profile
            </button>
            <button
              onClick={openDeleteModal}
              className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
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
