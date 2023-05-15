import DrawerMine from "../../../../components/Drawer";
import Middle from "../Middle";
import { Box, Typography } from "@mui/material";
import InstaAvatar from "../../../../components/InstaAvatar";
import { Colors } from "../../../../constants/pallette";
import { i18n } from "../../../../translations/i18n";

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
        width="75vw"
        noPadding

      >
        <Middle setOpenDrawer={setOpenDrawer} />

        <Box
          display='flex'
          columnGap={1}
          justifyContent='start'
          alignItems='center'
          paddingLeft="18px"
          mt='20px'


        >
          <InstaAvatar
            size='1.5rem'
            backgroundColor="white"
            color={Colors.tealc}
          />
          <Typography color={Colors.tealc} fontSize='20px' fontWeight={700} style={{ paddingTop: "2px" }}>
            {i18n.t("menuBar.instagram")}
          </Typography>

        </Box>


      </DrawerMine>
    </>
  );
};

export default MobileMainDrawer;
