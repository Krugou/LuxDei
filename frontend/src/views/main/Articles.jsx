import ArticleViewer from '../../components/main/ArticleViewer';
import {getAllArticles} from '../../hooks/ApiHooks';
import {useState, useEffect} from 'react';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticles();
        // console.log(data);
        setArticles(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchArticles();
  }, []);



  return (
    <div className='bg-gray-100 p-8 mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold text-center mt-8 mb-4'>Articles</h1>
      <ArticleViewer articles={articles.slice(-3)} />
    </div>
  );
};

export default Articles;
