import PropTypes from 'prop-types';
import React from 'react';


const ArticleViewer = ({articles}) => {
    return (
        <div className='bg-gray-100 p-8 mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-center mt-8 mb-4'>Articles</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {articles.map((article) => (
                    <div key={article.id} className='bg-white rounded-lg shadow-lg mb-10 overflow-hidden'>
                        <div className='p-4'>
                            <h2 className='text-xl font-bold mb-2' id={`article-title-${article.id}`} aria-label='Article title'>
                                {article.title}
                            </h2>
                            <p className='text-gray-700 text-base' id={`article-content-${article.id}`} aria-label='Article content'>
                                {article.content}
                            </p>
                            <div className='text-gray-500 text-sm mt-2' id={`article-timestamp-${article.id}`} aria-label='Article timestamp'>
                                {new Date(article.timestamp).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ArticleViewer.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired
        })
    ).isRequired
};

export default ArticleViewer;


