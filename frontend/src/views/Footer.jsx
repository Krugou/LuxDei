import React from 'react';
import FooterList from '../components/footer/FooterList';
import FooterCopyright from '../components/footer/FooterCopyright';
const Footer = () => {


    return (
        <footer className="bg-gmdeepblack text-gray-400 py-4">
            <FooterList />
            <FooterCopyright
                companyName="JakFilms"
            />
        </footer>
    );
};

export default Footer;
