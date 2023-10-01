import React from 'react';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: 'Article 1',
      content: 'This is the content of article 1.'
    },
    {
      id: 2,
      title: 'Article 2',
      content: 'This is the content of article 2.'
    },
    {
      id: 3,
      title: 'Article 3',
      content: 'This is the content of article 3.'
    }
  ];

  return (
    <div>
      <h1>Articles</h1>
      {articles.map(article => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Articles;
