import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header>
      <h1 onClick={handleLogoClick}>Header</h1>
      <Menu />
    </header>
  );
};

export default Header;
