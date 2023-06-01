import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/system'
import { Pallette } from '../../constants/pallette'

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
      backgroundColor: Pallette.primaryTransparent,
      color: Pallette.constrast,
      maxWidth: maxWidth ?? 240,
      fontSize: '12px',
      border: `0px solid ${Pallette.primaryTransparent}`,
      fontWeight: 'inherit',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: Pallette.primaryTransparent,

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
