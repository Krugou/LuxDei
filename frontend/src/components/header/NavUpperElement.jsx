import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';

const NavUpperElement = ({startSeconds, endSeconds}) => {
  const [animationDuration, setAnimationDuration] = useState(0);
  const policeCarRef = useRef(null);

  // Function to generate a random duration between minSeconds and maxSeconds
  const getRandomDuration = (minSeconds, maxSeconds) => {
    const minMilliseconds = minSeconds * 1000;
    const maxMilliseconds = maxSeconds * 1000;
    return Math.floor(Math.random() * (maxMilliseconds - minMilliseconds + 1)) + minMilliseconds;
  };

  // Function to start the animation with a new random duration
  const startAnimation = () => {
    const duration = getRandomDuration(startSeconds, endSeconds);
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
    <div key={animationDuration} className="relative overflow-hidden w-full h-8">
      <img
        id="police-car"
        ref={policeCarRef}
        className="absolute w-auto h-8 left-full ease-in-out delay-200 animate-police-car"
        src="/gifs/car.webp"
        alt="Police Car"
        style={{animationDuration: `${animationDuration}ms`}}
      />
      <img id='Robber'
        className="absolute w-auto h-6 left-full ease-in-out  animate-robber"
        src="/gifs/robber.gif"
        alt="Robber"
        style={{animationDuration: `${animationDuration}ms`}}
      />
    </div>
  );
};
NavUpperElement.propTypes = {
  startSeconds: PropTypes.number,
  endSeconds: PropTypes.number,
};

export default NavUpperElement;