import axios from "axios";
import { ArticleInterface } from "../types/Article.Interface";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

type SortField = keyof ArticleInterface; // Define the type for sort fields

export const fetchArticles = async (sortField: string | null): Promise<ArticleInterface[]> => {
  try {
    const response = await axios.get(API_URL);
    let data: ArticleInterface[] = response.data;

    // Perform sorting if sortField is provided
    if (sortField) {
      const sortOrder = sortField.startsWith("-") ? -1 : 1;
      const field = sortField.startsWith("-") ? sortField.slice(1) as SortField : sortField as SortField;

      data = data.sort((a, b) => {
        if (a[field] < b[field]) return -sortOrder;
        if (a[field] > b[field]) return sortOrder;
        return 0;
      });
    }

    // Add slug to each article
    data = data.map(article => ({
      ...article,
      slug: article.title.toLowerCase().replace(/ /g, "-"),
    }));

    console.log("Sorted data:", data); // Debug log
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
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
