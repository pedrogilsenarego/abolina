import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../../constants/pallette";
import CardMedia from "../../CardMedia";
import { RiDeleteBinLine } from "react-icons/ri";
import { useField } from "formik";

interface Props {
  fieldTitle: string;

  name: string;
}

const FileUploader = ({ fieldTitle, name }: Props) => {
  const [imageUpload, setImageUpload] = useState<any>();
  const [, mata, helpers] = useField(name);

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
            container
            flexDirection="row"
            alignItems="center"

            xs={6}
            style={{
              border: `solid 2px ${Colors.tealc}`,
              borderRadius: "4px",
              borderStyle: "dashed",
              padding: "10px",
            }}
          >
            <Grid item textAlign="start">
              <input
                type='file'
                onChange={(e: any) => {
                  setImageUpload(e?.target?.files[0]);
                  helpers.setValue(e?.target?.files[0]);
                  helpers.setError(undefined)
                }}
              />
            </Grid>

            <Grid item textAlign="start">
              {imageUpload && (
                <RiDeleteBinLine
                  onClick={() => {
                    setImageUpload(undefined);
                    helpers.setValue(null);
                  }}
                  size='1.5em'
                  color={Colors.tealc}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <CardMedia
              height='100'
              image={imageUpload ? URL.createObjectURL(imageUpload) : undefined}
            />
          </Grid>
        </Grid>
      </Box>
      <Box display='flex' justifyContent='start'>
        {mata.error && (
          <Typography
            style={{
              color: "red",
              fontSize: "12px",
              marginLeft: "15px",
              marginTop: "5px",
            }}
          >
            {mata.error}
          </Typography>
        )}
      </Box>
    </Box >
  );
};

export default FileUploader;
