import { useState, useEffect } from "react";
import { ArticleInterface } from "../types/Article.Interface";
import { fetchSingleArticle } from "../utils/api";
import { Link, useParams, useLocation } from "react-router-dom";

const SingleArticle = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location || {};
  const { sortQuery } = state || {};

  const [article, setArticle] = useState<ArticleInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSingleArticle(`${params.id}`);
        setArticle(data ?? null);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    } 

    fetchDataAndHandleLoading();
    }, [params.id]);
  return (
    <div className="single-article-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && article && (
        <>
          <h1>{article.title}</h1>
          <hr />
          <h3>ID:{article.id}</h3>
          <h3>Slug:{article.slug}</h3>
          <hr />
          <p>{article.body}</p>
          <div className="all-articles-link">
            <Link to={`../..${sortQuery}`} relative="path">All Articles</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default SingleArticle