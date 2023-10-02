import React, { useState } from 'react';
import Banner from '../../components/main/Banner';
import EventDetails from '../../components/main/EventDetails';
const LandingPage = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <Banner />
      <EventDetails />
    </>
  );
};

export default LandingPage;
