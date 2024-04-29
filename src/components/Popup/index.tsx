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
import "./index.css";
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
          <div
            className="gradient-border"
            style={{
              padding: "20px 20px 10px 20px",
              borderBottom: "solid 0px #009ca600",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "end",
            }}
          >
            <Typography
              component="div"
              style={{
                fontSize: "26px",
                color: Colors.tealc,
                fontWeight: 700,
                letterSpacing: "0px",
                lineHeight: "26px",
              }}
            >
              {title}
            </Typography>
          </div>
        )}
        <DialogContent
          dividers
          style={{
            borderTop: "solid 0px black",
            color: "white",
            overflow: "hidden",
            msOverflowStyle: "none",
            scrollbarWidth: "none",

            display: "flex",
            alignItems: "center",
          }}
        >
          {children}
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
