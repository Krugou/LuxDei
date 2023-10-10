import React from 'react';
import TeamMember from '../../components/main/TeamMember';

const Team = () => {
    return (
        <div className='container mx-auto p-4 m-4'>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mybasetext">Meet the Jak-Films Festival Team</h1>
            <p className="text-base md:text-lg mybasetext mt-4">
                Our festival wouldn't be possible without the dedicated and passionate individuals who make up our team. Get to know
                the people behind the scenes who work tirelessly to bring you an exceptional cinematic experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                <TeamMember
                    imgSrc="../images/Joonas.jpg"
                    altText="Team Member 1"
                    name="Joonas Grim"
                    role="Festival Director"
                />
                <TeamMember
                    imgSrc="../images/aleksi.jpg"
                    altText="Team Member 2"
                    name="Aleksi Nightshade"
                    role="Program Coordinator"
                />
                <TeamMember
                    imgSrc="../images/Kaarle.jpg"
                    altText="Team Member 3"
                    name="Kaarle Darkwood"
                    role="Marketing Manager"
                />
            </div>
          <div className="md:w-1/2">
            <img
                src="../images/joonas.jpg"
                alt="Jakfilms"
                className="w-full h-auto  rounded-lg"
            />
          </div>
        </div>

    );
};

export default Team;

