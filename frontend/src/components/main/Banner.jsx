import React, { useState, useEffect } from 'react';
import inspiskuva1 from '../../images/inspiskuva1.jpg';
import inspiskuva2 from '../../images/inspiskuva2.jpg';
import inspiskuva3 from '../../images/inspiskuva3.jpg';

const Banner = () => {
  const images = [inspiskuva1, inspiskuva2, inspiskuva3]; // Array of image paths
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to update the current image index
  const changeImage = (nextIndex) => {
    setCurrentImageIndex((prevIndex) => {
      // Wrap around to the beginning if reaching the end
      if (nextIndex < 0) {
        return images.length - 1;
      } else if (nextIndex >= images.length) {
        return 0;
      }
      return nextIndex;
    });
  };

  useEffect(() => {
    // Set an interval to change the image every 10 seconds
    const intervalId = setInterval(
      () => changeImage(currentImageIndex + 1),
      10000
    );

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  const bannerStyle = {
    backgroundImage: `url(${images[currentImageIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '50vh',
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
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => changeImage(currentImageIndex - 1)}
            className='text-white mr-4 hover:text-gray-400 p-2 rounded-lg bg-gmmidnightgreen hover:bg-gmpictonblue transition-all duration-300 ease-in-out'
          >
            Previous
          </button>
          <button
            onClick={() => changeImage(currentImageIndex + 1)}
            className='text-white p-2 rounded-lg bg-gmmidnightgreen hover:bg-gmpictonblue hover:text-white transition-all duration-300 ease-in-out'
          >
            Next
          </button>
        </div>
        <a
          href='#articles'
          className='lg:text-xl font-semibold text-white mt-4 rounded p-1 bg-gmmidnightgreen hover:bg-gmpictonblue hover:text-white transition-all duration-300 ease-in-out'
          style={{ border: '1px solid black' }}
        >
          Latest articles
        </a>
      </div>
    </div>
  );
};

export default Banner;
