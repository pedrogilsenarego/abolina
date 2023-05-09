import { Divider } from "@mui/material"
import { Title } from "../../../../styles"
import { i18n } from "../../../../translations/i18n"

const Settings = () => {
  return (
    <>
      <Title fontSize='16px'>
        {i18n.t("modules.admin.manageBooks.settingsBook.breadCrumbs")}
      </Title>
      <Divider />
    </>
  )
}

export default Settings