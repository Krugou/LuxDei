import React, { useEffect, useState, useContext } from 'react';
import {
  getContact,
  DeleteContact,
  getDatabaseInfo,
} from '../../hooks/ApiHooks';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import formatDate from '../../utils/utilities';
import ErrorAlert from '../../components/main/ErrorAlert';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { update, setUpdate } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [alert, setAlert] = useState('');

  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('userToken');
  const [databaseInfo, setDatabaseInfo] = useState({
    chatmessages: 'not available',
    users: 'not available',
    contacts: 'not available',
    latestMessageTimestamp: 'not available',
  });

  // Initialize the sorting option in a useState
  const [sortOption, setSortOption] = useState('Oldest'); // Default sorting option

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getContact(token);

        console.log(response, 'GET contacts RESPONSE');
        setContacts(response);
      } catch (error) {
        if (error.message.includes('Unauthorized')) {
          // Unauthorized error (401)
          // Display an alert to the user
          setAlert('Your session has expired, please login again.');
          setTimeout(() => {
            navigate('/logout');
          }, 3000);
        } else {
          // Handle other errors if needed
          setAlert(error.message);
        }
      }
    };
    fetchContacts();
  }, [token, update]);

  const handleChange = (event) => {
    const selectedSortOption = event.target.value;

    // Update the sorting option in the useState
    setSortOption(selectedSortOption);
  };

  const fetchDatabaseInfo = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const databaseResponse = await getDatabaseInfo(token);
      console.log(databaseResponse, 'DATABASE RESPONSE');
      setDatabaseInfo(databaseResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Filter contacts based on searchQuery
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let sortedContacts = [...filtered];

    if (sortOption === 'Latest') {
      sortedContacts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (sortOption === 'Oldest') {
      sortedContacts.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }

    // Update the sorting option in the useState
    setFilteredContacts(sortedContacts);
  }, [contacts, searchQuery, sortOption]);

  useEffect(() => {
    fetchDatabaseInfo();
  }, []);

  const handleDeleteContact = async (contactID) => {
    try {
      await DeleteContact(contactID, token);
      setUpdate(!update);
    } catch (error) {
      if (error.message.includes('Unauthorized')) {
        // Unauthorized error (401)
        // Display an alert to the user
        setAlert('Your session has expired, please login again.');
        setTimeout(() => {
          navigate('/logout');
        }, 3000);
      } else {
        // Handle other errors if needed
        setAlert(error.message);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl md:max-w-full sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-3xl font-bold text-gray-900 mb-8 border-b border-black '>
            Admin Dashboard
          </h1>
          {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

          <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b border-black pb-8'>
            <div className='md:w-1/2'>
              {/* Info paragraphs */}
              <div className='info-paragraphs'>
                <p className='text-gray-600'>
                  Messages in database: {databaseInfo.chatmessages}
                </p>
                <p className='text-gray-600'>
                  Users in database: {databaseInfo.users}
                </p>
                <p className='text-gray-600'>
                  Help requests in database: {databaseInfo.contacts}
                </p>
                <p className='text-gray-600'>
                  Latest chat message:{' '}
                  {formatDate(databaseInfo.latestMessageTimestamp)}
                </p>
              </div>
            </div>

            <FormControl className='md:w-1/4 mt-2 md:mt-0'>
              <Typography variant='sort-by'>Sort Help Requests By:</Typography>

              <Select
                className='favorite-selector'
                value={sortOption}
                onChange={handleChange}
              >
                <MenuItem value='Latest'>
                  <div className='item-selector'>
                    <AutorenewIcon className='highest-star-selector-icon' />
                    <span className='selector-text'>Latest</span>
                  </div>
                </MenuItem>
                <MenuItem value='Oldest'>
                  <div className='item-selector'>
                    <AutorenewIcon className='highest-star-selector-icon' />
                    <span className='selector-text'>Oldest</span>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Search bar */}
          <div className='mt-6'>
            <input
              type='text'
              placeholder='Filter by name'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='px-3 py-2 border rounded-lg'
            />
          </div>

          {/* Display contact cards */}
          <div className='mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-start justify-between overflow-auto'
              >
                <div className='max-w-full'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Sender's preferred name: {contact.name}
                  </h2>
                  <p className='text-gray-600 font-bold'>
                    Sender's current username: {contact.username}
                  </p>
                  <p className='text-gray-600 font-bold'>
                    Sender's username when sent: {contact.usernamewhensent}
                  </p>
                  <p className='text-gray-600 font-bold'>
                    Sender's userid: {contact.useridofsender}
                  </p>
                  <p className='text-gray-600 font-bold border-b border-black'>
                    Sender's Email: {contact.email}
                  </p>
                  <p className='text-gray-600 mt-2 border-b border-black '>
                    Message: {contact.message}
                  </p>
                  <p className='text-gray-600 mt-2'>
                    Received: {formatDate(contact.createdAt)}
                  </p>
                </div>
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteContact(contact._id)}
                  className='mt-4 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
