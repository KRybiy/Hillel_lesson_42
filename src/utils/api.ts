import axios from "axios";
import { ArticleInterface } from "../types/Article.Interface";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchArticles = async (sortField: string | null) => {
  try {
    const params: Record<string, number | string> = {};
    if (sortField !== null) {
      const sortOrder = sortField.startsWith("-") ? "desc" : "asc";
      params['__sort'] = sortField.startsWith("-") ? sortField.slice(1) : sortField;
      params['__order'] = sortOrder;
    }
    const response = await axios.get(API_URL);
    const data: ArticleInterface[] = (response.data as ArticleInterface[]).map(
      (article: ArticleInterface) => {
        return {
          ...article,
          slug: article.title.toLowerCase().replace(/ /g, "-"),
        };
      }
    );
    return data;
  } catch (error) {
    throw new Error("Error fetching articles");
  }
};

export const fetchSingleArticle = async (id: string | number) => {
  try {
    

    const response = await axios.get(`${API_URL}/${id}`);
    const data: ArticleInterface = response.data as ArticleInterface;

    if (data) {
      const article: ArticleInterface = {
        ...data,
        slug: data.title.toLowerCase().replace(/ /g, "-"),
      };
      return article;
    }
  } catch (error: unknown) {
    throw new Error("Error fetching single article");
  }
};
