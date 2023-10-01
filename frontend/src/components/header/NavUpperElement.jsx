import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

const NavUpperElement = ({randomSeconds}) => {
  const [animationDuration, setAnimationDuration] = useState(0);
  const policeCarRef = useRef(null);

  // Function to generate a random duration between 1 to 10 seconds
  const getRandomDuration = () => {
    return Math.floor(Math.random() * randomSeconds + 1) * 1000; // Convert to milliseconds
  };

  // Function to start the animation with a new random duration
  const startAnimation = () => {
    const duration = getRandomDuration();
    // console.log('duration:', duration);

    setAnimationDuration(duration);

    const policeCar = policeCarRef.current;
    if (policeCar) {
      policeCar.offsetWidth;
    }
  };

  // Use useEffect to start the animation when the component mounts and whenever the animationDuration state changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      startAnimation();
    }, animationDuration);
    return () => clearInterval(intervalId);
  }, [animationDuration]);

  return (
    <div key={animationDuration} className="relative overflow-hidden w-full h-6">
      <img
        id="police-car"
        ref={policeCarRef}
        className="absolute w-auto h-6 left-full ease-in-out delay-200 animate-police-car"
        src="https://clipart-library.com/images/BigKkbeMT.gif"
        alt="Police Car"
        style={{animationDuration: `${animationDuration}ms`}}
      />
      <img id='Robber'
        className="absolute w-auto h-6 left-full ease-in-out  animate-robber"
        src="https://media.istockphoto.com/id/469270246/vector/running-thief-cartoon-illustration.jpg?s=612x612&w=0&k=20&c=_eYw8R0PGvuhWJnRwxtY_YcM5Py2cZLGo-xJafwoi6g="
        alt="Robber"
        style={{animationDuration: `${animationDuration}ms`}}
      />
    </div>
  );
};
NavUpperElement.propTypes = {
  randomSeconds: PropTypes.number,
};

export default NavUpperElement;