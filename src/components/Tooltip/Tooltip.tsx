import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import { Colors, Pallette } from "../../constants/pallette";

interface Props extends TooltipProps {
  children: any;
  title: string;
  maxWidth?: number;
}

const ToolTipJ = ({ children, title, maxWidth }: Props) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      color: Pallette.constrast,
      maxWidth: maxWidth ?? 400,
      fontSize: "14px",
      border: `2px solid ${Pallette.primary}`,
      fontWeight: "inherit",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: Pallette.primary,
    },
  }));
  return (
    <HtmlTooltip
      arrow
      title={
        <span
          dangerouslySetInnerHTML={{ __html: title }}
          style={{
            whiteSpace: "pre-line",
            color: Pallette.primary,
          }}
        />
      }
    >
      {children}
    </HtmlTooltip>
  );
};

export default ToolTipJ;
