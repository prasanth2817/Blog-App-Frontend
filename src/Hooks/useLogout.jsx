import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("User-token");
    setAuthUser(null);
    navigate("/login");
  };

  return logout;
};

export default useLogout;
