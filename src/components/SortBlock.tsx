import { useNavigate } from "react-router-dom";

const SortBlock = () => {
  const navigate = useNavigate();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortKey = event.target.value;
    navigate(`${sortKey ? '?sort=' + sortKey : ''}`);
  };

  return (
    <div className="sort-block">
      <h2>Sort articles by:</h2>
      <select onChange={handleSortChange} defaultValue="">
        <option value="" disabled>Select sorting</option>
        <option value="title">Title, Asc</option>
        <option value="-title">Title, Desc</option>
        <option value="id">ID, Asc</option>
        <option value="-id">ID, Desc</option>
        <option value="">Reset Sort</option>
      </select>
    </div>
  )
}

export default SortBlock;
