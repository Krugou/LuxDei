import React from 'react';
import FooterList from '../components/footer/FooterList';
import FooterCopyright from '../components/footer/FooterCopyright';
const Footer = () => {
  return (
    <footer className='bg-gmdeepblack border-t-4 border-gmgold text-gray-400 py-4'>
      <FooterList />
      <FooterCopyright companyName='Jak Films Productions' />
    </footer>
  );
};

export default Footer;
