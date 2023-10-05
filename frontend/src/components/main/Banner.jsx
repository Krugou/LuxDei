import React, {useEffect, useState} from 'react';


const Banner = () => {
  const images = ['bg-inspiskuva1', 'bg-inspiskuva2', 'bg-inspiskuva3']; // Array of background image class names
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to update the current image index
  const changeImage = (nextIndex) => {
    setCurrentImageIndex((prevIndex) => {
      if (nextIndex < 0) {
        // Wrap around to the beginning if reaching the end
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
    <div className={`bg-banner ${images[currentImageIndex]}`}>
      <div className='flex justify-between items-center h-full flex-col'>
        <div className='w-full h-full flex justify-center items-center lg:max-w-3xl sm:max-w-md text-center'>
          <h2 className='text-white text-xl lg:text-4xl'>
            Lights, Camera, Action: Join Us for an Unforgettable Cinematic
            Experience at the JAK-Films Festival
          </h2>
        </div>
        <header className='text-white'>
          <h2 className='text-white text-xl lg:text-2xl mb-20'>
            Celebrating cinema, one click at a time
          </h2>
        </header>
      </div>
      {/* only for preloading background images */}
      <img src={'./assets/images/inspiskuva1.jpg'} alt='' className='hidden preload' />
      <img src={'./assets/images/inspiskuva2.jpg'} alt='' className='hidden preload' />
      <img src={'./assets/images/inspiskuva3.jpg'} alt='' className='hidden preload' />
    </div>

  );
};

export default Banner;
