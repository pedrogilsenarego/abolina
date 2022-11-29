import DrawerMine from "../../../components/Drawer"

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean) => void
}

const MobileMainDrawer = ({ openDrawer, setOpenDrawer }: Props) => {

  return (
    <>
      <DrawerMine position="left" openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
        Teste
      </DrawerMine>
    </>
  )
}

export default MobileMainDrawer