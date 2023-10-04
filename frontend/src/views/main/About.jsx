import React from 'react';
import ParagraphSection from '../../components/main/ParagraphSection';
const About = () => {
    return (
        <div className="bg-gray-100  p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl text-center font-bold mb-4">About JakFilms Movie Festival</h1>
                <div className="container flex flex-col md:flex-row gap-2">
                    <p className="paragraph">
                        Welcome to the JakFilms Movie Festival, where we celebrate the art of cinema! Immerse yourself in a world of storytelling, creativity, and entertainment. From classic films to cutting-edge cinema, we have it all.
                    </p>
                <p className="paragraph">
                    Join us for a week of movie screenings, discussions, and more. Don't miss our special events, including Q&A sessions with renowned directors, film workshops, and an exclusive awards ceremony to honor outstanding filmmakers."
                </p>
                    <p className="paragraph">
                        Whether you're a dedicated cinephile or simply looking for a great time, the JakFilms Movie Festival has something for everyone. Grab your popcorn, sit back, and enjoy the magic of the silver screen with us!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;

