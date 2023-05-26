import React from "react"
import { ReactNode, useState } from "react"

interface Props {
  icon: ReactNode
  color?: string
  colorHover?: string
}

const Icon = ({ icon, color, colorHover }: Props) => {
  const [hover, setHover] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  const iconWithStyle = React.Children.map(icon, child => {
    if (React.isValidElement(child)) {
      const updatedProps = {
        ...(child.props as object),
        style: {
          ...(child.props.style as object),
          color: hover ? colorHover : color || "inherit"
        }
      }
      return React.cloneElement(child, updatedProps)
    }
    return child
  })

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {iconWithStyle}
    </div>
  )
}

export default Icon
