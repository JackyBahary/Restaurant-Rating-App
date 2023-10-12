import { FC } from "react";
import { useParams } from "react-router-dom";

const User: FC = () => {
  const params = useParams();

  return <>Hello {params.id}</>;
};

export default User;
