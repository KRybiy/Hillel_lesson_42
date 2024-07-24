import queryString from "query-string";
import { useLocation } from "react-router-dom";

export const useSortField = () => {
  const location = useLocation();

  const query = queryString.parse(location.search);
  const sortKey = query.sort?.toString() || null;
  const sortQuery = `${sortKey ? `?sort=${sortKey}` : ""}`;

  return {
    sortQuery, sortKey };
}