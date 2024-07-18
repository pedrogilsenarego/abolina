import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { i18n } from "../../translations/i18n";
import { Colors } from "../../constants/pallette";

const Policies = () => {
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("md"));
  return (
    <Container
      maxWidth="lg"
      style={{ justifyContent: "center", marginTop: mobile ? "30px" : "0px" }}
    >
      <Typography fontWeight={800} fontSize={28} color={Colors.tealc}>
        {i18n.t("modules.privacyPolicies.title")}
      </Typography>
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section1"),
        }}
        align="justify"
        style={{ marginTop: "30px", whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section2"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section3"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section4"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section5"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section6"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section7"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section8"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section9"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section10"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section11"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.section12"),
        }}
        align="justify"
        style={{ whiteSpace: "pre-line" }}
      />
      <Typography fontWeight={800} fontSize={28} color={Colors.tealc} mt="50px">
        {i18n.t("modules.privacyPolicies.title2")}
      </Typography>
      <Typography
        dangerouslySetInnerHTML={{
          __html: i18n.t("modules.privacyPolicies.sectionb1"),
        }}
        align="justify"
        style={{ marginTop: "30px", whiteSpace: "pre-line" }}
      />
    </Container>
  );
};

export default Policies;
