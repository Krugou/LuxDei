const baseUrl = 'https://jakfilms.northeurope.cloudapp.azure.com/backend/';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  // console.log(json, 'dofetch json');
  // console.log(response, 'dofetch response');
  if (!response.ok) {
    const message = json.error ? `${json.error}` : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};
const testDatabaseConnection = async () => {
  const options = {
    method: 'GET',
  };
  try {
    await doFetch(baseUrl + 'users', options);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const postSchedule = async (data, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  };
  return await doFetch(baseUrl + 'admin/schedule', options);
};
const postArticle = async (data, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  };
  return await doFetch(baseUrl + 'admin/article', options);
};

const getSchedule = async () => {
  const options = {
    method: 'GET',
  };
  // return await doFetch(baseUrl + 'schedule', options);
  const scheduleData = [
    {
      day: 'Day 1 - Opening Night',
      schedule: [
        {
          time: '5:00 PM',
          title: 'Red Carpet Arrival',
        },
        {
          time: '7:00 PM',
          title: 'Opening Film: "The Grand Premiere"',
        },
        {
          time: '9:30 PM',
          title: 'Welcome Reception',
        },
      ],
    },
    {
      day: 'Day 2 - Spotlight Films',
      schedule: [
        {
          time: '10:00 AM',
          title: '"Cinematic Wonders" Documentary',
        },
        {
          time: '1:30 PM',
          title: '"A Journey Through Time" Panel Discussion',
        },
        {
          time: '4:00 PM',
          title: '"Director\'s Vision" Q&A Session',
        },
        {
          time: '7:30 PM',
          title: 'Spotlight Film: "The Masterpiece"',
        },
      ],
    },
    {
      day: 'Day 3 - Closing Day',
      schedule: [
        {
          time: '11:00 AM',
          title: 'Film Workshop: "Behind the Scenes"',
        },
        {
          time: '2:00 PM',
          title: 'Award Ceremony: "Best of the Fest"',
        },
        {
          time: '5:30 PM',
          title: 'Closing Film: "The Farewell"',
        },
        {
          time: '8:00 PM',
          title: 'Farewell Party',
        },
      ],
    },
  ];
  return scheduleData;
};
const getAllArticles = async () => {
  const options = {
    method: 'GET',
  };
  const articles = [
    {
      id: 1,
      title: 'A Memorable Evening',
      content:
        "As the virtual curtains rose on the JakFilms Festival, Sarah settled into her cozy corner of the couch with her laptop. She had been looking forward to this online film festival for weeks. The first film, a heartwarming documentary, transported her to a far-off village where the power of human connection prevailed. Sarah was so moved that she couldn't resist sharing her thoughts in the festival's chat. To her surprise, the director of the film responded, sparking a conversation that lasted well into the night. It was a memorable evening that made her feel like she was right there at the festival, even from the comfort of her home.",
      timestamp: '2023-10-06 08:30 AM',
    },
    {
      id: 2,
      title: 'A Global Gathering',
      content:
        "This year's JakFilms Festival was unlike any other. Participants from all around the world tuned in to enjoy a diverse selection of films. Mark, a film enthusiast from Australia, found himself immersed in a French short film that transported him to the streets of Paris. He shared his excitement in the festival's discussion forum, and soon, a fellow viewer from France chimed in. What started as a conversation about cinema turned into a lasting friendship. Mark and his new friend promised to meet at the festival again next year, proving that the JakFilms Festival wasn't just about movies; it was about connecting people across the globe.",
      timestamp: '2023-10-07 03:15 PM',
    },
    {
      id: 3,
      title: 'A Journey of Discovery',
      content:
        "For Alex, the JakFilms Festival was a journey of self-discovery. As a budding filmmaker, they had submitted their short film to the festival with hopes of getting noticed. To their surprise, their film was selected and showcased alongside other talented creators. During the festival, viewers praised Alex's work and provided valuable feedback. Inspired by the positive response, Alex began networking with other filmmakers and industry professionals. They realized that the JakFilms Festival wasn't just an event to watch films; it was a platform for emerging talents to shine. This experience fueled Alex's passion for filmmaking and set them on a path to pursue their dreams.",
      timestamp: '2023-10-08 10:45 AM',
    },
    {
      id: 4,
      title: 'A Magical Night Under the Stars',
      content:
        "Under a blanket of twinkling stars, Emily attended the JakFilms Festival's outdoor screening event. The open-air cinema created a magical atmosphere as the audience gathered on the lush green lawn. The featured film was a visually stunning masterpiece that left everyone in awe. After the screening, attendees shared their favorite moments around a campfire, forging new connections and sharing stories late into the night. Emily couldn't help but feel that the JakFilms Festival had brought a touch of enchantment to her life.",
      timestamp: '2023-10-09 07:00 PM',
    },
    {
      id: 5,
      title: 'A Cinematic Adventure',
      content:
        'Jake embarked on a cinematic adventure at the JakFilms Festival. He attended a marathon of classic films that spanned genres and eras. From silent black-and-white gems to modern blockbusters, the festival offered a journey through the history of cinema. Jake met fellow film buffs who shared his passion for the art of storytelling through film. They spent the day discussing their favorite scenes and directors. It was a day filled with cinematic magic that left Jake with a newfound appreciation for the medium.',
      timestamp: '2023-10-10 11:00 AM',
    },
  ];
  // return await doFetch(baseUrl + 'articles', options);
  return articles;
};
const getFestivalMovies = async () => {
  const options = {
    method: 'GET',
  };
  const fakeMovies = [
    {
      id: 1,
      title: 'Mikko/Evtek to Alaska',
      img: './assets/images/mikkotoalaska.png',
      runningTime: 8520000, // 2 hours and 22 minutes in milliseconds
      description:
        'After graduating from Evtek, Mikko decided to move to Alaska starts working at local affliate of nbc station called kash.',
    },
    {
      id: 2,
      title: 'Morning after',
      img: './assets/images/morningafter.png',
      runningTime: 10500000, // 2 hours and 55 minutes in milliseconds
      description:
        'Man finds himself in Evtek toilet and he has no idea what happened last night. See the story unfold. ',
    },
    {
      id: 3,
      title: 'Museo olohuoneena',
      img: './assets/images/museumlivingroom.png',
      runningTime: 12120000, // 3 hours and 22 minutes in milliseconds
      description:
        'Join people seeing exhibition in museo olohuoneena. See the exciting documentary unfold.',
    },
    {
      id: 4,
      title: 'Opiskelijaelämää 2009',
      img: './assets/images/studentlife.png',
      runningTime: 9120000, // 2 hours and 32 minutes in milliseconds
      description:
        'Student in dining area of Evtek. Feel the atmosphere of student life in 2009.',
    },
    {
      id: 5,
      title: 'Democompo',
      img: './assets/images/democompo.png',
      runningTime: 5760000, // 1 hour and 36 minutes in milliseconds
      description:
        'See student works of 3d animation and games.',
    },

  ];
  return fakeMovies;
  // return await doFetch(baseUrl + 'movies', options);
};

const useUser = () => {
  const postUser = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    // console.debug('ApiHooks.js - handleInputChange: Inputs:', inputs);
    return await doFetch(baseUrl + 'users', options);
  };

  const postLogin = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'auth/login', options);
  };

  const getUserInfoByToken = async (token) => {
    // console.log(token);
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await doFetch(baseUrl + 'secure/', options);
  };

  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'secure/users', options);
  };
  const deleteUser = async (token) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await doFetch(baseUrl + 'secure/users', options);
  };
  const doLogin = async (inputs) => {
    try {
      const loginResult = await postLogin(inputs);
      localStorage.setItem('userToken', loginResult.token);
      console.log('username:', loginResult.user.name);
      return loginResult.user;
    } catch (error) {
      throw new Error(error.message); // Rethrow the error
    }
  };

  return {
    postUser,
    postLogin,
    getUserInfoByToken,
    putUser,
    deleteUser,
    doLogin,
  };
};
export {
  testDatabaseConnection,
  useUser,
  getAllArticles,
  getSchedule,
  getFestivalMovies,
  postArticle,
  postSchedule,
};
