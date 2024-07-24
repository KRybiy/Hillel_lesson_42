import { useEffect, useState } from "react";
import { ArticleInterface } from "../types/Article.Interface";
import { fetchArticles } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useSortField } from "../hooks/useSortField";
import { generateTitle } from "../utils/generateTitle";
import { isValidSortField } from "../utils/isValidSortKey";
import SortBlock from "./SortBlock";

const Articles = () => {
  const [articles, setArticles] = useState<ArticleInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { sortKey, sortQuery } = useSortField();
  const navigate = useNavigate();


  console.log('SortKey:', sortKey); // Debugging log

  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      try {
        setIsLoading(true);
        const data = isValidSortField(sortKey) ? await fetchArticles(sortKey) : await fetchArticles(null);
        setArticles(data);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndHandleLoading();
  }, [sortKey]);

  useEffect(() => {
    if(!isValidSortField(sortKey)) {
      navigate('.');
    }
  }, [sortKey, navigate]);

  return (
    <div className="articles-container">
      <SortBlock/>
      <h1>
        Articles {generateTitle(sortQuery)}
      </h1>
      <div className="articles-list">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading &&
          !error &&
          articles.map(({ id, title, slug }) => (
            <h2 key={id}>
              <Link to={`${slug}/${id}`} state={{ id, sortQuery}}>{id}.{title}</Link>
            </h2>
          ))}
      </div>
    </div>
  );
};
export default Articles;
