import { FC } from "react";
import halfstar from "../assets/star-half-empty.png";
import star from "../assets/star.png";

interface Props {
  rating: number;
}

const StarCell: FC<Props> = (props) => {
  // Return the star images based on rating
  switch (props.rating) {
    case 0.5:
      return <img src={halfstar} width="20px" />;
    case 1:
      return <img src={star} width="20px" />;
    case 1.5:
      return (
        <>
          <img src={star} width="20px" />
          <img src={halfstar} width="20px" />
        </>
      );
    case 2:
      return (
        <>
          <img src={star} width="20px" />
          <img src={star} width="20px" />
        </>
      );
    case 2.5:
      return (
        <>
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={halfstar} width="20px" />
        </>
      );
    case 3:
      return (
        <>
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={star} width="20px" />
        </>
      );
    case 3.5:
      return (
        <>
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={halfstar} width="20px" />
        </>
      );
    case 4:
      return (
        <>
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={star} width="20px" />
        </>
      );
    case 4.5:
      return (
        <>
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={halfstar} width="20px" />
        </>
      );
    case 5:
      return (
        <>
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={star} width="20px" />
          <img src={star} width="20px" />
        </>
      );
    default:
      return <div>N/A</div>;
  }
};

export default StarCell;
