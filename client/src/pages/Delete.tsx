import { FC } from "react";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";

const Delete: FC = () => {
  let params = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await fetch(`${baseUrl}/restaurants/${params.id}`, {
      method: "DELETE",
    });
    return navigate("/");
  };

  return (
    <>
      <form>
        <label htmlFor="delete">DELETE </label>
        <button id="delete" type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </>
  );
};

export default Delete;
