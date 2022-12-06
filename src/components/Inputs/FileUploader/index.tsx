import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../../constants/pallette";
import CardMedia from "../../CardMedia";
import useFileUploader from "./useFileUploader";

interface Props {
  fieldTitle: string;
  title: string;
  setImage: (image: string) => void;
}

const FileUploader = ({ title, setImage, fieldTitle }: Props) => {
  const [imageUpload, setImageUpload] = useState<any>();
  const { uploadImage, progress } = useFileUploader({ imageUpload, setImage });

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
              padding: "10px"
            }}
          >
            <input
              type='file'
              onChange={(e: any) => setImageUpload(e?.target?.files[0])}
            />
            <button disabled={!title} onClick={() => uploadImage(title)}>
              Upload Image
            </button>

          </Grid>
          <Grid item xs={6}>
            <CardMedia height="100" image={URL.createObjectURL(imageUpload)} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FileUploader;
