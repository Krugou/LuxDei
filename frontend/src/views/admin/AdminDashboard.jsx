import React, { useEffect, useState } from 'react';
import { getContact, DeleteContact } from '../../hooks/ApiHooks';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const name = 'newarticle';
  const name2 = 'newschedule';

  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
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
  }, []);

  const handleDeleteContact = async (contactID) => {
    try {
      const response = await DeleteContact(contactID, token);

      console.log(response, 'GET RESPONSE');
      setContacts(response);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-3xl font-bold text-gray-900'>Admin Stats</h1>
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
          {/* Display contact cards */}
          <div className='mt-10 space-y-6'>
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className='bg-white p-6 rounded-lg shadow-lg flex items-center justify-between'
              >
                <div>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Senders name: {contact.name}
                  </h2>
                  <p className='text-gray-600'>
                    Senders account name in database: {contact.usernameofsender}
                  </p>
                  <p className='text-gray-600'>Email: {contact.email}</p>
                  <p className='text-gray-600'>Message: {contact.message}</p>
                </div>
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteContact(contact._id)} // Delete contact
                  className='px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300'
                >
                  Delete
                </button>
              </div>
            ))}

            {/* Display error if it exists */}
            {error && (
              <div className='bg-red-100 p-4 rounded-lg shadow-lg'>
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
