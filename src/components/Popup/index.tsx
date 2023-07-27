import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Colors } from "../../constants/pallette";
import Button from "./ButtonPopup";
import { Actions } from "./types";

interface Props {
  children: JSX.Element;
  title?: string;
  openPopup: boolean;
  setOpenPopup?: (openPopup: boolean) => void;

  actions?: Actions[];
  onClose?: () => void;
  fullScreen?: boolean;
}

const Popup = ({
  title,
  children,
  openPopup,
  setOpenPopup,
  actions,
  onClose,
  fullScreen,
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
            backgroundColor: "#e4e4e4",
            minWidth: fullScreen ? "100vw" : mobile ? "90vw" : "80vw",
            minHeight: fullScreen ? "100vh" : mobile ? "auto" : "89vh",
            boxShadow: "0px -50px 50px -20px #00000066 inset",
          },
        }}
        onClose={onClose}
      >
        {title && (
          <DialogTitle>
            <div style={{ textAlign: "center" }}>
              <Typography
                component="div"
                style={{
                  fontSize: "28px",
                  color: Colors.tealc,
                  fontWeight: 700,
                  letterSpacing: "3px",
                }}
              >
                {title}
              </Typography>
            </div>
          </DialogTitle>
        )}
        <DialogContent
          dividers
          style={{
            color: "white",
            overflow: "hidden",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Box
            style={{
              width: "100%",

              display: "flex",
              justifyContent: "center",
              backgroundColor: "red",
            }}
          >
            {children}
          </Box>
          {actions && (
            <>
              <Divider
                style={{
                  width: "100%",
                  background: "#ffffff66",
                  marginTop: "10px",
                }}
              />
              <Grid
                container
                justifyContent="flex-end"
                style={{ marginTop: "10px" }}
              >
                {actions?.map((item, pos) => {
                  return (
                    <Button
                      disabled={item.disabled}
                      title={item.title}
                      key={pos}
                      onClick={item.onClick}
                    />
                  );
                })}
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Popup;
