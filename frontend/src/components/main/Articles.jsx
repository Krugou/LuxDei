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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(article => (
          <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-700 text-base">{article.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;