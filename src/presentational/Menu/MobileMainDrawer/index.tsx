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
        width="70vw"
        paddingLeft="30px"
      >
        <Middle setOpenDrawer={setOpenDrawer} />
        <Box display='flex'

          justifyContent='start'
          alignItems='center'>
          <Box
            display='flex'
            columnGap={1}
            justifyContent='start'
            alignItems='center'
            mt='60px'

          >
            <Typography color='white' fontSize='20px' fontWeight={700}>
              {i18n.t("menuBar.instagram")}
            </Typography>
            <InstaAvatar
              size='25px'
              backgroundColor="white"
              color={Colors.tealc}
            />
          </Box>
        </Box>

      </DrawerMine>
    </>
  );
};

export default MobileMainDrawer;
