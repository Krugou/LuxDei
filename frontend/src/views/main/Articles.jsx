import React from 'react';
import ArticleViewer from '../../components/main/ArticleViewer';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "A Memorable Evening",
      content:
        "As the virtual curtains rose on the JakFilms Festival, Sarah settled into her cozy corner of the couch with her laptop. She had been looking forward to this online film festival for weeks. The first film, a heartwarming documentary, transported her to a far-off village where the power of human connection prevailed. Sarah was so moved that she couldn't resist sharing her thoughts in the festival's chat. To her surprise, the director of the film responded, sparking a conversation that lasted well into the night. It was a memorable evening that made her feel like she was right there at the festival, even from the comfort of her home.",
      timestamp: "2023-10-06 08:30 AM"
    },
    {
      id: 2,
      title: "A Global Gathering",
      content:
        "This year's JakFilms Festival was unlike any other. Participants from all around the world tuned in to enjoy a diverse selection of films. Mark, a film enthusiast from Australia, found himself immersed in a French short film that transported him to the streets of Paris. He shared his excitement in the festival's discussion forum, and soon, a fellow viewer from France chimed in. What started as a conversation about cinema turned into a lasting friendship. Mark and his new friend promised to meet at the festival again next year, proving that the JakFilms Festival wasn't just about movies; it was about connecting people across the globe.",
      timestamp: "2023-10-07 03:15 PM"
    },
    {
      id: 3,
      title: "A Journey of Discovery",
      content:
        "For Alex, the JakFilms Festival was a journey of self-discovery. As a budding filmmaker, they had submitted their short film to the festival with hopes of getting noticed. To their surprise, their film was selected and showcased alongside other talented creators. During the festival, viewers praised Alex's work and provided valuable feedback. Inspired by the positive response, Alex began networking with other filmmakers and industry professionals. They realized that the JakFilms Festival wasn't just an event to watch films; it was a platform for emerging talents to shine. This experience fueled Alex's passion for filmmaking and set them on a path to pursue their dreams.",
      timestamp: "2023-10-08 10:45 AM"
    },
    {
      id: 4,
      title: "A Magical Night Under the Stars",
      content:
        "Under a blanket of twinkling stars, Emily attended the JakFilms Festival's outdoor screening event. The open-air cinema created a magical atmosphere as the audience gathered on the lush green lawn. The featured film was a visually stunning masterpiece that left everyone in awe. After the screening, attendees shared their favorite moments around a campfire, forging new connections and sharing stories late into the night. Emily couldn't help but feel that the JakFilms Festival had brought a touch of enchantment to her life.",
      timestamp: "2023-10-09 07:00 PM"
    },
    {
      id: 5,
      title: "A Cinematic Adventure",
      content:
        "Jake embarked on a cinematic adventure at the JakFilms Festival. He attended a marathon of classic films that spanned genres and eras. From silent black-and-white gems to modern blockbusters, the festival offered a journey through the history of cinema. Jake met fellow film buffs who shared his passion for the art of storytelling through film. They spent the day discussing their favorite scenes and directors. It was a day filled with cinematic magic that left Jake with a newfound appreciation for the medium.",
      timestamp: "2023-10-10 11:00 AM"
    }
  ];



  return (
    <><ArticleViewer articles={articles.slice(-3)} /></>
  );
};

export default Articles;
