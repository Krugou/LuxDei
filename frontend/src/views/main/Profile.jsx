import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FlagIcon } from 'react-flag-kit';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../components/main/ErrorAlert';
import SuccessAlert from '../../components/main/SuccessAlert';
import formatDate from '../../utils/utilities';

import { useUser } from '../../hooks/ApiHooks';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [alert, setAlert] = useState('');
  const [successAlert, setSuccessAlert] = useState('');

  const { deleteUser, putUser } = useUser();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    name: '',
    email: '',
    password: '',
    countryid: user ? user.countryid : 'FI',
  });

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

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const deleteResponse = await deleteUser(token);
      console.log(deleteResponse);
      setSuccessAlert('Your account has been deleted successfully');
      setTimeout(() => {
        navigate('/logout');
      }, 3000);
    } catch (error) {
      setAlert(error.message);
    }
    closeDeleteModal();
  };

  const handleEditProfile = async () => {
    const token = localStorage.getItem('userToken');
    try {
      for (const [key, value] of Object.entries(editData)) {
        if (value === '') delete editData[key];
      }
      console.log(editData, 'EDIT DATA');
      const updateResponse = await putUser(editData, token);
      console.log(updateResponse);
      setSuccessAlert('Your data has been updated, please login again.');
      setTimeout(() => {
        navigate('/logout');
      }, 3000);
    } catch (error) {
      setAlert(error.message);
    }
    closeEditModal();
  };

  return (
    <div className=' max-w-screen-sm mx-auto mt-4 mb-4 p-4 border rounded shadow-lg'>
      {successAlert && (
        <SuccessAlert
          onClose={() => setSuccessAlert(null)}
          successAlert={successAlert}
        />
      )}
      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

      <h1 className='text-2xl font-semibold mb-4'>Profile</h1>
      {user && (
        <div className='flex flex-col'>
          <div>
            <p className='mb-2'>
              <span className='font-semibold'>Name:</span>{' '}
              {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            </p>
            <p className='mb-2'>
              <span className='font-semibold'>Email:</span> {user.email}
            </p>
            <p className='mb-2'>
              <span className='font-semibold'>Account created:</span>{' '}
              {formatDate(user.timecreated)}
            </p>
          </div>
          <div className='col-span-2'>
            <FlagIcon
              code={user.countryid.toUpperCase()}
              alt={`Flag for ${user.countryid}`}
              size={120} // Adjust the size as needed
            />
          </div>
          <div className='col-span-3 mt-4 space-x-4 flex'>
            <button className='button' onClick={openEditModal}>
              Edit Profile
            </button>
            <button onClick={openDeleteModal} className='button'>
              Delete Profile
            </button>
            <button
              onClick={() => {
                navigate('/contactus');
              }}
              className='button'
            >
              Request Help
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white w-11/12 lg:w-1/3 sm:w-1/2 p-4 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Edit Information</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditProfile();
              }}
              className='flex flex-col'
            >
              <label className='flex flex-col items-start mt-2'>
                <span className='block text-gray-700 font-bold mb-2'>
                  Username
                </span>
                <input
                  type='text'
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  aria-label='Username'
                  autoComplete='username'
                  placeholder='atleast 3 char max 15'
                />
              </label>
              <label className='flex flex-col items-start mt-4'>
                <span className='block text-gray-700 font-bold mb-2'>
                  Email
                </span>
                <input
                  type='email'
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  aria-label='Email'
                  autoComplete='email'
                />
              </label>
              <label className='flex flex-col items-start mt-4'>
                <span className='block text-gray-700 font-bold mb-2'>
                  Password
                </span>
                <input
                  type='password'
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  aria-label='Password'
                  autoComplete='new-password'
                  placeholder='atleast 8 char one capital letter'
                />
              </label>
              <label className='flex flex-col items-start mt-4'>
                <span className='block text-gray-700 font-bold mb-2'>
                  Country
                </span>
                <select
                  value={editData.countryid}
                  onChange={(e) =>
                    setEditData({ ...editData, countryid: e.target.value })
                  }
                  className='border font-bold border-gray-400 text-white bg-gray-700 rounded-lg p-2 w-full'
                >
                  <option value='FI'>Finland</option>
                  <option value='DK'>Denmark</option>
                  <option value='NO'>Norway</option>
                  <option value='SE'>Sweden</option>
                  <option value='IS'>Iceland</option>
                  <option value='EE'>Estonia</option>
                </select>
              </label>
              <div className='flex justify-end mt-4'>
                <button
                  type='button'
                  onClick={closeEditModal}
                  className='button mr-4'
                >
                  Cancel
                </button>
                <button type='submit' className='button'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Profile Modal */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white w-10/12 lg:w-1/3 sm:w-1/2 p-4 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Confirm Deletion</h2>
            <p>Are you sure you want to delete your profile?</p>
            <div className='mt-4 space-x-4'>
              <button
                onClick={handleDeleteProfile}
                className='bg-gmdeepred hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
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
