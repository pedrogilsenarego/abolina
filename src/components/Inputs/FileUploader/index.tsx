import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../../constants/pallette";
import CardMedia from "../../CardMedia";
import { RiDeleteBinLine } from "react-icons/ri";
import { useField } from "formik";
import { useRef } from "react";

interface Props {
  fieldTitle: string;
  acceptType?: string;
  name: string;
  multiple?: boolean;
}

const FileUploader = ({ fieldTitle, name, acceptType, multiple }: Props) => {
  const [imageUpload, setImageUpload] = useState<any>({});
  const [, mata, helpers] = useField(name);
  const inputRef = useRef<any>();

  const a = Array.prototype.slice.call(imageUpload);

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
        <Grid container columnSpacing={1}>
          <Grid
            item
            container
            flexDirection='row'
            alignItems='center'
            xs={6}
            style={{
              border: `solid 2px ${Colors.tealc}`,
              borderRadius: "4px",
              borderStyle: "dashed",
              padding: "10px",
            }}
          >
            <Grid item textAlign='start'>
              <input
                type={"file"}
                multiple={multiple}
                ref={inputRef}
                accept={acceptType || "image/*"}
                onChange={(e: any) => {
                  setImageUpload(e?.target?.files);
                  helpers.setValue(e?.target?.files);
                  helpers.setError(undefined);
                }}
              />
            </Grid>

            <Grid item textAlign='start'>
              {imageUpload && (
                <RiDeleteBinLine
                  onClick={() => {
                    setImageUpload({});
                    helpers.setValue(null);
                    inputRef.current.value = "";
                  }}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  size='1.5em'
                  color={Colors.tealc}
                />
              )}
            </Grid>
          </Grid>
          <Grid item container xs={6}>
            {imageUpload &&
              a.map((image: any, pos: number) => {
                return (
                  <CardMedia
                    height='100'
                    key={pos}
                    image={URL.createObjectURL(image)}
                  />
                );
              })}
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
    </Box>
  );
};

export default FileUploader;
