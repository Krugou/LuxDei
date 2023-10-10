import React, { useState } from 'react';
import Banner from '../../components/main/Banner';
import EventDetails from '../../components/main/EventDetails';
import LiveStreamButton
  from '../../components/header/buttons/LiveStreamButton.jsx';
import {useNavigate} from 'react-router-dom';
import HeaderListButton
  from '../../components/header/buttons/HeaderListButton.jsx';
const LandingPage = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  const navigate = useNavigate();

  return (
    <>
      <Banner />
      <EventDetails />
      <div className="bg-gmdeepblack border-gmgold border-t-4 min-h-50">

        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                  src="../../public/images/card.jpg"
                  alt="Jakfilms"
                  className="w-full h-auto  rounded-lg"
              />

            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-white mb-4">Our Schedule</h2>
              <p className="text-white leading-relaxed mb-4">
                Welcome to our eagerly anticipated film festival, where we have curated an exceptional lineup of cinematic treasures that will take you on a thrilling journey through the world of storytelling. Here's a glimpse of what you can expect from our festival schedule
              </p>
              <p className="text-white leading-relaxed mb-4">
                Our film festival schedule promises a week of entertainment, education, and inspiration, where you'll have the chance to immerse yourself in the magic of cinema.
              </p>
              <div className="flex gap-10 mt-20 items-center">
                <h2 className="text-xl text-white">Check out our schedule!</h2>
                <LiveStreamButton name='schedule' navigate={navigate} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gmdeepblack border-gmgold border-t-4 min-h-50">

        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                  src="../../public/images/movie.jpg"
                  alt="Jakfilms"
                  className="w-full h-auto  rounded-lg"
              />

            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-white mb-4">Movies of the festival</h2>
              <p className="text-white leading-relaxed mb-4">
                Welcome to our spectacular film festival, where cinematic artistry takes center stage! Our festival lineup boasts an eclectic array of films that will captivate, inspire, and leave you in awe. Our festival is not just a celebration of movies; it's a celebration of the human experience.
              </p>
              <p className="text-white leading-relaxed mb-4">
                Each movie in our festival has been meticulously chosen to showcase the best in storytelling, acting, and cinematography.
              </p>
              <div className="flex gap-10 mt-20 items-center">
                <h2 className="text-xl text-white">Check out the our movies!</h2>
                <LiveStreamButton name='movies' navigate={navigate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
