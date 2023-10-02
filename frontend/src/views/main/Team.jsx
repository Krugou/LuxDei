import React from 'react';

const Team = () => {
    return (
        <div className='bg-alepurple container mx-auto p-4 m-4'>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mybasetext">Meet the Jak-Films Festival Team</h1>
            <p className="text-base md:text-lg mybasetext mt-4">
                Our festival wouldn't be possible without the dedicated and passionate individuals who make up our team. Get to know
                the people behind the scenes who work tirelessly to bring you an exceptional cinematic experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                {/* Team Member 1 */}
                <div className="bg-alegreen rounded-lg shadow-md p-4 md:p-6">
                    <img
                        src="./img/grim.png"
                        alt="Team Member 1"
                        className="w-24 md:w-32 h-24 md:h-32 rounded-full mx-auto mb-2 md:mb-4"
                    />
                    <h2 className="text-lg md:text-xl font-semibold mybasetext"> Silas Thorn</h2>
                    <p className="text-gray-600 mybasetext">Festival Director</p>
                </div>

                {/* Team Member 2 */}
                <div className="bg-alegreen rounded-lg shadow-md p-4 md:p-6">
                    <img
                        src="./img/dying.png"
                        alt="Team Member 2"
                        className="w-24 md:w-32 h-24 md:h-32 rounded-full mx-auto mb-2 md:mb-4"
                    />
                    <h2 className="text-lg md:text-xl font-semibold mybasetext">Ezekiel Nightshade</h2>
                    <p className="text-gray-600 mybasetext">Program Coordinator</p>
                </div>

                {/* Team Member 3 */}
                <div className="bg-alegreen rounded-lg shadow-md p-4 md:p-6">
                    <img
                        src="./img/stanley.png"
                        alt="Team Member 3"
                        className="w-24 md:w-32 h-24 md:h-32 rounded-full mx-auto mb-2 md:mb-4"
                    />
                    <h2 className="text-lg md:text-xl font-semibold mybasetext">Nathaniel Darkwood</h2>
                    <p className="text-gray-600 mybasetext">Marketing Manager</p>
                </div>
            </div>
        </div>

    );
};

export default Team;

