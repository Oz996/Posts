import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  }, []);
  return (
    <div className="w-7/12 mx-auto">
      <h2 className="text-2xl font-semibold">Redirecting...</h2>
    </div>
  );
};

export default NotFound;
