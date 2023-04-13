import { useEffect, useState } from "react";
import { useField } from "formik";
import {
  hasUpperCase,
  hasLowerCase,
  hasNumber,
  hasSpecialChar,
} from "../../../../utils/stringUtils";
import { Typography } from "@mui/material";
import { Colors } from "../../../../constants/pallette";

const MIN_CHARACTERS = 8;

interface Props {
  mobile: boolean;
}

const ValidationHelper = ({ mobile }: Props) => {
  const [field, , ,] = useField("password");
  const [characters, setCharacters] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  useEffect(() => {
    if (field.value.length >= MIN_CHARACTERS) setCharacters(true);
    else setCharacters(false);
    if (hasUpperCase(field.value) && field.value.length > 0) setUppercase(true);
    else setUppercase(false);
    if (hasLowerCase(field.value) && field.value.length > 0) setLowercase(true);
    else setLowercase(false);
    if (hasNumber(field.value) && field.value.length > 0) setNumber(true);
    else setNumber(false);
    if (hasSpecialChar(field.value) && field.value.length > 0)
      setSpecialChar(true);
    else setSpecialChar(false);
  }, [field.value]);

  return (
    <>
      {field.value.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            // border: `dashed 2px ${Colors.tealc}`,
            borderRadius: "4px",
            padding: "10px",
            position: mobile ? "relative" : "absolute",
            right: mobile ? "auto" : "13vw",
            top: mobile ? "auto" : "50vh",
          }}
        >
          <Typography
            fontSize="1.5rem"
            color={characters ? Colors.tealc : Colors.tealcTransparent}
          >
            &#9900;&nbsp;Contain {MIN_CHARACTERS} characters
          </Typography>
          <Typography
            fontSize="1.5rem"
            color={uppercase ? Colors.tealc : Colors.tealcTransparent}
          >
            &#9900;&nbsp;One Uppercase
          </Typography>
          <Typography
            fontSize="1.5rem"
            color={lowercase ? Colors.tealc : Colors.tealcTransparent}
          >
            &#9900;&nbsp;One LowerCase
          </Typography>
          <Typography fontSize="1.5rem" color={number ? Colors.tealc : Colors.tealcTransparent}>
            &#9900;&nbsp;One Number
          </Typography>
          <Typography
            fontSize="1.5rem"
            color={specialChar ? Colors.tealc : Colors.tealcTransparent}
          >
            &#9900;&nbsp;One Special Character
          </Typography>
        </div>
      )}
    </>
  );
};
export default ValidationHelper;
