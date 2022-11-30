import DrawerMine from "../../../components/Drawer";
import Middle from "../Middle";
import { Box, Typography } from "@mui/material";
import InstaAvatar from "../../../components/InstaAvatar";
import { Colors } from "../../../constants/pallette";
import { i18n } from "../../../translations/i18n";
import Right from "../Right"

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean) => void;
}

const MobileMainDrawer = ({ openDrawer, setOpenDrawer }: Props) => {
  return (
    <>
      <DrawerMine
        position='left'
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        fullHeight
      >
        <Middle setOpenDrawer={setOpenDrawer} />
        <Box display='flex'

          justifyContent='center'
          alignItems='center'>
          <Box
            display='flex'
            columnGap={1}
            justifyContent='center'
            alignItems='center'
            mt='40px'
            style={{ border: "solid 2px #ffffff66", borderRadius: "6px", width: "50vw" }}
          >
            <Typography color='white' fontSize='20px' fontWeight={700}>
              {i18n.t("menuBar.instagram")}
            </Typography>
            <InstaAvatar
              size='40px'
              backgroundColor={Colors.tealc}
              color='white'
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" style={{ marginTop: "220px" }}>
          <Right />
        </Box>
      </DrawerMine>
    </>
  );
};

export default MobileMainDrawer;
