import { css } from '@emotion/react'
import { styled } from '@mui/material/styles'

export const ToggleInput = styled('input')({
  width: 0,
  height: 0,
  visibility: 'hidden',
})

type ToggleLabelProps = {
  isActive?: boolean
  disabled?: boolean
}

export const ToggleLabel = styled('label')<ToggleLabelProps>(
  ({ isActive = false, disabled = false }) => css`
    display: block;
    width: 40px;
    height: 20px;
    background-color: ${isActive && !disabled ? '#1CC38F' : '#828282'};
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    transition: 0.3s;
    margin-top: -15px;

    &::after {
      content: '';
      width: 10px;
      height: 10px;
      background-color: #fafafa;
      position: absolute;
      left: ${isActive ? 'calc(100% - 15px)' : '5px'};
      top: 5px;
      border-radius: 70px;
      transition: 0.3s;
    }
  `
)
