import FooterListButton from './buttons/FooterListButton';

const FooterList = () => {
  return (
    <div className='container mx-auto flex justify-between items-center'>
      <ul className='flex flex-col'>
        <FooterListButton name='home' />
        <FooterListButton name='about' />
        <FooterListButton name='team' />
        <FooterListButton name='articles' />
        <FooterListButton name='archive' />
      </ul>

      <ul className='flex flex-col'>
        <FooterListButton name='schedule' />
        <FooterListButton name='livestream' />
        <FooterListButton name='movies' />
        <FooterListButton name='profile' />
      </ul>

      <ul className='flex flex-col'>
        <FooterListButton name='login' />
        <FooterListButton name='register' />
        <FooterListButton name='terms of service' />
        <FooterListButton name='privacy policy' />
        <FooterListButton name='contact us' />
      </ul>
    </div>
  );
};

export default FooterList;
