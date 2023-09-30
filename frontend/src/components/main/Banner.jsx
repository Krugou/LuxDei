import React from 'react';
import inspiskuva from '../../images/inspiskuva.jpg'; // Import the image

const Banner = () => {
  const bannerStyle = {
    backgroundImage: `url(${inspiskuva})`, // Use the imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '85vh',
  };

  return (
    <div style={bannerStyle}>
      <div className='flex justify-between items-center h-full flex-col'>
        <header className='text-white'>
          <h1 className='text-xl lg:text-2xl mt-12 ml-4 mr-4 bg-black rounded font-bold p-1'>
            Celebrating cinema, one click at a time
          </h1>
        </header>
        <div className='w-full h-full flex justify-center items-center lg:max-w-3xl sm:max-w-md text-center'>
          <h2 className='text-white text-xl lg:text-4xl'>
            Lights, Camera, Action: Join Us for an Unforgettable Cinematic
            Experience at the JAK-Films Festival
          </h2>
        </div>
        <a
          href='#articles'
          className='lg:text-xl font-semibold text-white mb-4 rounded p-1 bg-gmmidnightgreen hover:bg-gmpictonblue hover:text-white transition-all duration-300 ease-in-out'
          style={{ border: '1px solid black' }}
        >
          Latest articles
        </a>
      </div>
    </div>
  );
};

export default Banner;
