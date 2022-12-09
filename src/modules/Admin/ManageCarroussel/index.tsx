import { Container, Grid } from "@mui/material";
import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCarroussell } from "../../../slicer/books/books.actions";
import { State } from "../../../slicer/types";
import CardMedia from "../../../components/CardMedia";

const ManageCarrousell = () => {
  const dispatch = useDispatch();
  const carroussell = useSelector<State, string[]>(
    (state) => state.books.carroussell || []
  );

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
        {carroussell.map((image: string, pos: number) => {
          return (
            <Grid xs={4}>
              <CardMedia key={pos} image={image} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ManageCarrousell;
