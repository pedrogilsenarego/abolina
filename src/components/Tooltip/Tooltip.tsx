import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/system'

interface Props {
  children: any
  title: string
  maxWidth?: number
}

const ToolTipJ = ({ children, title, maxWidth }: Props) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.primary.light,
      color: 'black',
      maxWidth: maxWidth ?? 240,
      fontSize: '12px',
      border: '1px solid #dadde9',
      fontWeight: 'inherit',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: 'lightGrey',
    },
  }))
  return (
    <HtmlTooltip
      arrow
      placement="top"
      title={
        <span
          dangerouslySetInnerHTML={{ __html: title }}
          style={{
            whiteSpace: 'pre-line',
          }}
        />
      }
    >
      {children}
    </HtmlTooltip>
  )
}

export default ToolTipJ
