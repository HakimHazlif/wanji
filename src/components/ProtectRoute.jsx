import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const { uid } = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!uid) {
      navigate("/login");
    }
  }, [uid, navigate]);

  return <div>{children}</div>;
};

export default ProtectRoute;
