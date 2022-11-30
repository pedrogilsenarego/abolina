import DrawerMine from "../../../components/Drawer"
import Middle from "../Middle"

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean) => void
}

const MobileMainDrawer = ({ openDrawer, setOpenDrawer }: Props) => {

  return (
    <>
      <DrawerMine position="left" openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} fullHeight>
        <Middle setOpenDrawer={setOpenDrawer} />
      </DrawerMine>
    </>
  )
}

export default MobileMainDrawer