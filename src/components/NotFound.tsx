import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [ navigate ]);

  return (
    <div>
      <h1 className="not-found">404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
      <div>
        <Link to="/">Go back to the homepage</Link>
      </div>
    </div>
  )
}

export default NotFound