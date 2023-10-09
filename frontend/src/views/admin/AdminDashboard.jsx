import React, { useEffect, useState, useContext } from 'react';
import { getContact, DeleteContact } from '../../hooks/ApiHooks';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { FormControl, MenuItem, Select, Typography } from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const name = 'newarticle';
  const name2 = 'newschedule';
  const { update, setUpdate } = useContext(UserContext);
  const [sortOption, setSortOption] = useState('Oldest'); // Default sorting option

  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getContact(token);

        console.log(response, 'GET RESPONSE');
        setContacts(response);
      } catch (error) {
        setError(error);
      }
    };
    fetchContacts();
  }, [token, update]);

  useEffect(() => {
    // Filter contacts based on searchQuery
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, searchQuery]);

  const handleDeleteContact = async (contactID) => {
    try {
      await DeleteContact(contactID, token);
      setUpdate(!update);
    } catch (error) {
      setError(error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', options);
  };

  const handleChange = (event) => {
    const selectedSortOption = event.target.value;

    let sortedContacts = [...filteredContacts];

    if (selectedSortOption === 'Latest') {
      sortedContacts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (selectedSortOption === 'Oldest') {
      sortedContacts.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }

    setSortOption(selectedSortOption);
    setFilteredContacts(sortedContacts);
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl md:max-w-full sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-3xl font-bold text-gray-900'>Admin Dashboard</h1>

          <div className='mt-6'>
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

          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='md:w-1/2'>
              {/* Info paragraphs */}
              <p className='text-gray-600'>Messages in database: 123</p>
              <p className='text-gray-600'>Users in database: 123</p>
              <p className='text-gray-600'>Users chatting: 123</p>
              <p className='text-gray-600'>Help requests in database: 123</p>
              <p className='text-gray-600'>Users chatting: 123</p>
            </div>

            <FormControl className='md:w-1/4'>
              <Typography variant='sort-by' sx={{ ml: 1 }}>
                Sort By:
              </Typography>

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
              placeholder='Search by name'
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
                className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-start justify-between'
              >
                <div>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Senders prefered name: {contact.name}
                  </h2>
                  <p className='text-gray-600 font-bold'>
                    Senders current username: {contact.username}
                  </p>
                  <p className='text-gray-600 font-bold'>
                    Senders username when sent: {contact.usernamewhensent}
                  </p>
                  <p className='text-gray-600 font-bold'>
                    Senders userid: {contact.useridofsender}
                  </p>
                  <p className='text-gray-600 font-bold'>
                    Email: {contact.email}
                  </p>
                  <p className='text-gray-600 mt-2'>
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

            {/* Display error if it exists */}
            {error && (
              <div className='col-span-full bg-red-100 p-4 rounded-lg shadow-lg'>
                <p className='text-red-600'>Error: {error.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
