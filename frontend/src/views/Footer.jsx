import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <p>&copy; 2021 My Website</p>
                <ul className="flex space-x-4">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;