import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../../constants/pallette";
import CardMedia from "../../CardMedia";
import useFileUploader from "./useFileUploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { useField } from "formik";

const FileUploader = ({ title, setImage, fieldTitle, name }) => {
  const [imageUpload, setImageUpload] = useState();
  const { uploadImage, progress } = useFileUploader({ imageUpload, setImage });
  const [field, mata] = useField(name);

  const configTextField = {
    ...field,
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  return (
    <Box>
      <Box display='flex' justifyContent='start'>
        <Typography>{fieldTitle}</Typography>
      </Box>

      <Box
        style={{
          border: `solid 2px ${Colors.tealc}`,
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <Grid container columnSpacing={2}>
          <Grid
            item
            xs={6}
            style={{
              border: `solid 2px ${Colors.tealc}`,
              borderRadius: "4px",
              borderStyle: "dashed",
              padding: "10px",
            }}
          >
            <input
              type='file'
              onChange={(e) => setImageUpload(e?.target?.files[0])}
            />

            <button disabled={!title} onClick={() => uploadImage(title)}>
              Upload Image
            </button>
            {imageUpload && (
              <RiDeleteBinLine
                onClick={() => setImageUpload(null)}
                size='2em'
                color='black'
                style={{ cursor: "pointer" }}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <CardMedia
              height='100'
              image={imageUpload ? URL.createObjectURL(imageUpload) : undefined}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FileUploader;
