// Import from libraries
import { FC, useEffect, useState } from "react";
import SelectElement from "react-select";

// Import PNG
import halfStar from "../../assets/star-half-empty.png";
import star from "../../assets/star.png";

// Import SCSS
import "./StarSelect.scss";

// Create prop interface
interface Props {
  id: string;
  placeholder: string;
  change: Function;
  rating?: number;
  addOrEdit?: string;
}

// Create StarSelect component
const StarSelect: FC<Props> = (props) => {
  // Initialize index state to be used with rating (prop) to find the right index in options
  let [index, setIndex] = useState<number>(-1);

  // UseEffect hooks
  useEffect(() => {
    findIndex();
  }, []);

  // Function to find index in options by comparing the values in options with rating (prop)
  const findIndex = () => {
    options.forEach((element, i) => {
      if (parseFloat(element.value) === props.rating) {
        setIndex(i);
      }
    });
  };

  // Initialize array of options
  const options = [
    {
      value: "0.5",
      label: (
        <div>
          <img src={halfStar} height="30px" width="30px" />
        </div>
      ),
    },
    {
      value: "1",
      label: (
        <div>
          <img src={star} height="30px" width="30px" />
        </div>
      ),
    },
    {
      value: "1.5",
      label: (
        <div>
          <img src={star} height="30px" width="30px" />
          <img src={halfStar} height="30px" width="30px" />
        </div>
      ),
    },
    {
      value: "2",
      label: (
        <div>
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
        </div>
      ),
    },
    {
      value: "2.5",
      label: (
        <div>
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={halfStar} height="30px" width="30px" />
        </div>
      ),
    },
    {
      value: "3",
      label: (
        <div>
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
        </div>
      ),
    },
    {
      value: "3.5",
      label: (
        <div>
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={halfStar} height="30px" width="30px" />
        </div>
      ),
    },
    {
      value: "4",
      label: (
        <div>
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
        </div>
      ),
    },
    {
      value: "4.5",
      label: (
        <div>
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={halfStar} height="30px" width="30px" />
        </div>
      ),
    },
    {
      value: "5",
      label: (
        <div>
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
          <img src={star} height="30px" width="30px" />
        </div>
      ),
    },
  ];

  return (
    <>
      {/* // If the select component is used in "add" page */}
      {props.addOrEdit === "add" && (
        <>
          <label htmlFor="ratingStar">Rating: </label>
          <SelectElement
            inputId="ratingStar"
            options={options}
            className="select"
            placeholder={props.placeholder}
            onChange={(e) => {
              if (e != null) {
                props.change(parseFloat(e.value)); // Calls the handleChange function passed down from Add.tsx through 'change' function prop
              }
            }}
          />
        </>
      )}
      {/* // If the select component is used in "edit" page, needing to assign saved rating into this component */}
      {props.addOrEdit === "edit" &&
        index >= 0 && ( // Makes sure index is already assigned first before rendering
          <>
            <label htmlFor="ratingStar">Rating: </label>
            <SelectElement
              inputId="ratingStar"
              options={options}
              className="select"
              placeholder={props.placeholder}
              onChange={(e) => {
                if (e != null) {
                  props.change(parseFloat(e.value)); // Calls the handleChange function passed down from Edit.tsx through 'change' function prop
                }
              }}
              defaultValue={options[index]} // Assigns the default value of the select component to be the options array with the index which corresponds to the saved rating
            />
          </>
        )}
    </>
  );
};

export default StarSelect;
