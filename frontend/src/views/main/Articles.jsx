import React from 'react';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "A Memorable Evening",
      content:
        "As the virtual curtains rose on the JakFilms Festival, Sarah settled into her cozy corner of the couch with her laptop. She had been looking forward to this online film festival for weeks. The first film, a heartwarming documentary, transported her to a far-off village where the power of human connection prevailed. Sarah was so moved that she couldn't resist sharing her thoughts in the festival's chat. To her surprise, the director of the film responded, sparking a conversation that lasted well into the night. It was a memorable evening that made her feel like she was right there at the festival, even from the comfort of her home."
    },
    {
      id: 2,
      title: "A Global Gathering",
      content:
        "This year's JakFilms Festival was unlike any other. Participants from all around the world tuned in to enjoy a diverse selection of films. Mark, a film enthusiast from Australia, found himself immersed in a French short film that transported him to the streets of Paris. He shared his excitement in the festival's discussion forum, and soon, a fellow viewer from France chimed in. What started as a conversation about cinema turned into a lasting friendship. Mark and his new friend promised to meet at the festival again next year, proving that the JakFilms Festival wasn't just about movies; it was about connecting people across the globe."
    },
    {
      id: 3,
      title: "A Journey of Discovery",
      content:
        "For Alex, the JakFilms Festival was a journey of self-discovery. As a budding filmmaker, they had submitted their short film to the festival with hopes of getting noticed. To their surprise, their film was selected and showcased alongside other talented creators. During the festival, viewers praised Alex's work and provided valuable feedback. Inspired by the positive response, Alex began networking with other filmmakers and industry professionals. They realized that the JakFilms Festival wasn't just an event to watch films; it was a platform for emerging talents to shine. This experience fueled Alex's passion for filmmaking and set them on a path to pursue their dreams."
    }
  ];


  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold text-center mt-8 mb-4'>Articles</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {articles.map((article) => (
          <div key={article.id} className='bg-white rounded-lg shadow-lg mb-10 overflow-hidden'>
            <div className='p-4'>
              <h2 className='text-xl font-bold mb-2' id={`article-title-${article.id}`} aria-label='Article title'>
                {article.title}
              </h2>
              <p className='text-gray-700 text-base' id={`article-content-${article.id}`} aria-label='Article content'>
                {article.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
