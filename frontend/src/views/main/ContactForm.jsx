import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../components/main/ErrorAlert';
import NoUser from '../../components/main/NoUser';
import SuccessAlert from '../../components/main/SuccessAlert';
import { UserContext } from '../../contexts/UserContext';
import { postContact } from '../../hooks/ApiHooks';
const ContactForm = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState('');
  const [successAlert, setSuccessAlert] = useState('');

  const { user } = useContext(UserContext);

  // Use the "||" operator for default values to simplify the initial state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      // You can handle form submission logic here
      console.log(formData);

      // Create an object with the form data
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      // Make a POST request to your server to save the form data
      const response = await postContact(dataToSend, token);
      console.log(response, ' post response');

      // Form data successfully submitted
      console.log('Form data submitted successfully');
      setSuccessAlert(
        'Thank you for your submission, we will contact you via email.'
      );
      // Clear the form after successful submission
      setFormData({
        ...formData,
        message: '', // Clear the message field
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
      setAlert(error.message);
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-md my-6'>
      {successAlert && (
        <SuccessAlert
          onClose={() => setSuccessAlert(null)}
          successAlert={successAlert}
        />
      )}

      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

      {user ? (
        <>
          <h2 className='text-xl font-semibold mb-4'>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-gray-600 font-medium mb-2'
              >
                Your name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='How should we address you'
                className='w-full p-2 border rounded-md outline-none'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-600 font-medium mb-2'
              >
                Your email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full p-2 border rounded-md outline-none'
                placeholder='Email for us to contact'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='message'
                className='block text-gray-600 font-medium mb-2'
              >
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows='4'
                className='w-full p-2 border rounded-md outline-none'
                required
                placeholder='How may we help you'
                maxLength={500} // Set your desired maximum character limit here
              ></textarea>
              <p className='text-gray-500 text-sm mt-2'>
                {formData.message.length} / 500 characters
              </p>
            </div>
            <button
              type='submit'
              className='w-full bg-gmgold text-gmdeepblack py-2 px-4 rounded-md hover:bg-gmneonyellow transition duration-300'
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <NoUser name={' request for help.'} />
      )}
    </div>
  );
};

export default ContactForm;
