import { Container, Grid, Typography, Paper, Box } from "@mui/material";
import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCarroussell } from "../../../slicer/books/books.actions";
import useManageCarroussel from "./useManageCarroussel";
import Button from "../../../components/Buttons/Button";

const ManageCarrousell = () => {
  const dispatch = useDispatch();
  const carroussell = useSelector((state) => state.books.carroussell || []);

  const { handleDragEnter, dragging, list, handleDragStart, handleSubmit } =
    useManageCarroussel(carroussell);

  useEffect(() => {
    dispatch(fetchCarroussell());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth='md' style={{ justifyContent: "center" }}>
      <GStyled.Title>
        {i18n.t("modules.admin.manageCarroussell.submitTitle")}
      </GStyled.Title>
      <Grid container>
        {list.map((grp, grpI) => (
          <Grid item xs={12}>
            <Paper style={{ marginTop: "5px", minHeight: "200px" }}>
              <Typography>{grp.title}</Typography>
              <Box
                key={grpI}
                onDragEnter={
                  dragging && !grp.data.length
                    ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                    : null
                }
              >
                <Grid container>
                  <Grid xs={12} style={{ display: "flex" }}>
                    {grp.data.map((item, itemI) => (
                      <Box
                        onDragStart={(e) => {
                          handleDragStart(e, { grpI, itemI });
                        }}
                        onDragEnter={
                          dragging
                            ? (e) => handleDragEnter(e, { grpI, itemI })
                            : null
                        }
                        draggable={true}
                        key={itemI}
                        style={{
                          cursor: "pointer",
                          width: "200px",
                          margin: "5px",
                          padding: "0px",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={item}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            padding: "5px",
                          }}
                          alt=''
                        />
                      </Box>
                    ))}
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {list[0].data.map((string, pos) => {
        return <Typography key={pos}>{string}</Typography>;
      })}
      <Button label='Submit' onClick={handleSubmit} />
    </Container>
  );
};

export default ManageCarrousell;
