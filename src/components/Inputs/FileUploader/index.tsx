import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Colors } from "../../../constants/pallette";

import { RiDeleteBinLine } from "react-icons/ri";
import { useField } from "formik";
import { useRef } from "react";
import Image from "./Image";
import Loader from "../../Loader";

interface Props {
  fieldTitle: string;
  acceptType?: string;
  name: string;
  multiple?: boolean;
  value?: any;
  loading?: boolean;
}

const FileUploader = ({
  fieldTitle,
  name,
  acceptType,
  multiple,
  value,
  loading,
}: Props) => {
  const [imageUpload, setImageUpload] = useState<any[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | undefined>(
    undefined
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(
    undefined
  );

  const [, mata, helpers] = useField(name);
  const inputRef = useRef<any>();

  const handleDragStart = (e: any, index: number) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedIndex(index);
  };

  const handleDragOver = (e: any, index: number) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleDrop = (e: any, droppedIndex: number) => {
    e.preventDefault();
    if (draggedIndex === undefined || draggedIndex === droppedIndex) return;

    const updatedImages = [...a];
    const draggedImage = updatedImages[draggedIndex];

    if (draggedIndex < droppedIndex) {
      updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(droppedIndex, 0, draggedImage);
    } else if (droppedIndex === updatedImages.length) {
      updatedImages.push(draggedImage);
    } else {
      updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(droppedIndex, 0, draggedImage);
    }

    setImageUpload(updatedImages);
    helpers.setValue(updatedImages);

    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer();
    // Add each file to the DataTransfer object
    updatedImages.forEach((file) => {
      dataTransfer.items.add(file);
    });
    // Assign the updated FileList to the input
    inputRef.current.files = dataTransfer.files;

    // Reset the draggedIndex
    setDraggedIndex(undefined);
    setHoveredIndex(undefined);
  };

  useEffect(() => {
    if (value) {
      setImageUpload(value);
      helpers.setValue(value);
      inputRef.current.files = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const a = Array.prototype.slice.call(imageUpload);

  const handleDeleteImage = (pos: number) => {
    const updatedImages = [...a];
    updatedImages.splice(pos, 1);
    setImageUpload(updatedImages);
    helpers.setValue(updatedImages);
    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer();
    // Add each file to the DataTransfer object
    updatedImages.forEach((file) => {
      dataTransfer.items.add(file);
    });
    // Assign the updated FileList to the input
    inputRef.current.files = dataTransfer.files;
  };

  const handleChange = (e: any) => {
    // Convert existing files to an array
    const existingFiles = Array.prototype.slice.call(imageUpload);

    // Convert new files to an array
    const newFiles = Array.prototype.slice.call(e?.target?.files);

    // Concatenate existing and new files
    const allFiles = existingFiles.concat(newFiles);

    setImageUpload(allFiles);
    helpers.setValue(allFiles);
    helpers.setError(undefined);

    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer();

    // Add each file to the DataTransfer object
    allFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });

    // Assign the updated FileList to the input
    inputRef.current.files = dataTransfer.files;
  };

  return (
    <Box>
      <Box display='flex' justifyContent='start'>
        <Typography>{fieldTitle}</Typography>
      </Box>
      {loading ? (
        <Loader customMessage='Getting Images' />
      ) : (
        <>
          {" "}
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
                    onChange={(e: any) => handleChange(e)}
                  />
                </Grid>

                <Grid item textAlign='start'>
                  {imageUpload && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <RiDeleteBinLine
                        onClick={() => {
                          setImageUpload([]);
                          helpers.setValue(null);
                          inputRef.current.value = "";
                        }}
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                        size='1.5em'
                        color={Colors.tealc}
                      />
                      <Typography style={{ color: "red" }}>
                        Delete All
                      </Typography>
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid item container xs={6} rowSpacing={2}>
                {imageUpload &&
                  a.map((image: any, pos: number) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        draggable='true'
                        onDragStart={(e) => handleDragStart(e, pos)}
                        onDragOver={(e) => handleDragOver(e, pos)}
                        onDrop={(e) => handleDrop(e, pos)}
                        style={{
                          marginTop:
                            pos === hoveredIndex && pos !== draggedIndex
                              ? "10px"
                              : "0px",
                        }}
                      >
                        {pos === hoveredIndex && pos !== draggedIndex && (
                          <div
                            style={{
                              height: "80px",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: `dashed 3px ${Colors.darkGrey}`,
                              borderRadius: "10px",
                              marginBottom: "20px"
                            }}
                          >
                            <Typography>Drag here</Typography>
                          </div>
                        )}
                        <Image
                          pos={pos}
                          image={image}
                          deleteImage={handleDeleteImage}
                        />
                      </Grid>
                    );
                  })}
                {a.length > 0 && (
                  <Grid
                    item
                    xs={12}
                    container
                    onDragOver={(e) => handleDragOver(e, a.length)}
                    onDrop={(e) => handleDrop(e, a.length)}
                    style={{
                      marginTop: a.length === hoveredIndex ? "10px" : "0px",
                    }}
                  >
                    {a.length === hoveredIndex && (
                      <div
                        style={{
                          height: "80px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: `dashed 3px ${Colors.darkGrey}`,
                          borderRadius: "10px"
                        }}
                      >
                        <Typography>Drag here</Typography></div>
                    )}
                  </Grid>
                )}
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
        </>
      )}
    </Box>
  );
};

export default FileUploader;
