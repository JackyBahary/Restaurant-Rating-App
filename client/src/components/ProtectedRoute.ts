import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateWrapper = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const { email } = useContext(AuthContext);
  console.log("Email: " + email);
  return email == "" ? children : navigate('/');
};

export default PrivateWrapper