import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const images = ['bg-inspiskuva1', 'bg-inspiskuva2', 'bg-inspiskuva3']; // Array of background image class names
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

  return (
    <div className={`bg-banner ${currentImageIndex === 0
      ? 'bg-inspiskuva1'
      : currentImageIndex === 1
        ? 'bg-inspiskuva2'
        : 'bg-inspiskuva3'
      }`}>
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
            className='text-white mr-4 hover:text-gray-400 p-2 rounded-lg bg-gmmidnightgreen hover:bg-gmpictonblue transition-all duration-300 ease-in-out border-black border-solid border'
          >
            Previous
          </button>
          <button
            onClick={() => changeImage(currentImageIndex + 1)}
            className='text-white p-2 rounded-lg bg-gmmidnightgreen hover:bg-gmpictonblue hover:text-white transition-all duration-300 ease-in-out border-black border-solid border'
          >
            Next
          </button>
        </div>
        <button
          onClick={() => {
            navigate('/articles');
          }}
          className='lg:text-xl font-semibold text-white mt-4 rounded p-1 bg-gmmidnightgreen hover:bg-gmpictonblue hover:text-white transition-all duration-300 ease-in-out border-black border-solid border'
        >
          Latest articles
        </button>
      </div>
    </div>
  );
};

export default Banner;
