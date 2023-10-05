import React from 'react';
import PropTypes from 'prop-types';

const ErrorAlert = ({ alert, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        alert ? 'block' : 'hidden'
      }`}
    >
      <div className='modal-container mx-auto p-4 mt-10 rounded-lg bg-red-100 shadow-lg w-96'>
        <h2 className='text-xl text-red-600 font-bold mb-4'>Error</h2>
        <div className='mb-4'>
          {alert && <p className='text-red-700'>{alert}</p>}
        </div>
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;

ErrorAlert.propTypes = {
  alert: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
