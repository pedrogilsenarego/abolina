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
  actions?: Actions[];
  onClose?: () => void;
  maxWidth?: string;
}

const Popup = ({
  title,
  children,
  openPopup,
  maxWidth,
  actions,
  onClose,
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
            maxWidth: maxWidth || undefined,
            backgroundColor: "white",
            borderRadius: "20px",
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
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
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
