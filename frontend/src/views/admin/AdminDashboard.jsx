import React, { useEffect, useState } from 'react';
import { getContact } from '../../hooks/ApiHooks';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const name = 'newarticle';
  const name2 = 'newschedule';

  const [contacts, setContacts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const fetchContacts = async () => {
      try {
        const response = await getContact(token);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

      {/* Display contact cards */}
      <div className='contact-cards'>
        {contacts.map((contact) => (
          <div key={contact._id} className='contact-card'>
            <h2>Name: {contact.name}</h2>
            <p>Email: {contact.email}</p>
            <p>Message: {contact.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
