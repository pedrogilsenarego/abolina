import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Grid
} from "@mui/material";
import { Actions } from "./types"
import Button from "./ButtonPopup"
import { Colors } from "../../constants/pallette";

interface Props {
  children: JSX.Element;
  title: string;
  openPopup: boolean;
  setOpenPopup?: (openPopup: boolean) => void;
  clickToClose?: boolean;
  actions?: Actions[]
  onClose?: () => void
}

const Popup = ({
  title,
  children,
  openPopup,
  setOpenPopup,
  clickToClose,
  actions,
  onClose
}: Props) => {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        open={openPopup}
        style={{ color: "white" }}
        PaperProps={{
          style: {

            backgroundColor: "white",
            minWidth: mobile ? "90vw" : "50vw",


          },
        }}
        onClick={() => {
          if (clickToClose && setOpenPopup) setOpenPopup(false);
        }}
      >
        <DialogTitle>
          <div style={{ textAlign: "center" }}>
            <Typography
              variant='h6'
              component='div'
              style={{ color: Colors.tealc, fontWeight: 700, letterSpacing: "3px" }}
            >
              {title}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent dividers style={{ color: "white" }}>
          {children}
          <Divider
            style={{
              width: "100%",
              background: "#ffffff66",
              marginTop: "10px",
            }}
          />
          <Grid container justifyContent="flex-end" style={{ marginTop: "10px" }}>
            {actions?.map((item, pos) => {
              return (
                <Button disabled={item.disabled} title={item.title} key={pos} onClick={item.onClick} />
              )
            })}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Popup;
