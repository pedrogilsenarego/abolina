/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {
  FormControl,
  MenuItem as MuiMenuItem,
  Box,
  Menu,
  Chip,
  Checkbox,
  ListItemText,
  MenuList as MuiMenuList,
  Divider,
  Button,
  Select,
  InputLabel,
  Typography,
} from '@mui/material'
import Icon from '@mui/material/Icon'
import { styled } from '@mui/system'
import { useField } from "formik";
import Tooltip from '../../Tooltip/Tooltip'



interface MultiSelectProps<T> {
  label: string
  items: T[]
  name: string;
  defaultValue?: T
  keyRef?: string
  valueRef?: string
  multiple?: boolean
  chips?: boolean
  disabled?: boolean
  disableDefaultLabel?: boolean
  showInputInfo?: boolean
  inputInfo?: string
}

const MenuItem = styled(MuiMenuItem)(() => ({
  background: 'white',
}))

const MenuList = styled(MuiMenuList)(() => ({
  display: 'grid',
  gridTemplateColumns: '50% 50%',
}))

const ChipItem = styled(Chip)(() => ({
  backgroundColor: '#FEEFDE',
  border: '1px solid #F68B1E',
  boxSizing: 'border-box',
  borderRadius: '4px',
  marginRight: '5px',
  color: '#F68B1E',
}))

const MultiSelectInput: React.FunctionComponent<MultiSelectProps<any>> = ({
  label,
  name,
  defaultValue,
  items,
  keyRef = 'title',
  valueRef = 'value',
  chips = false,
  disabled,
  disableDefaultLabel = false,
  showInputInfo = false,
  inputInfo = '',
}) => {
  const labelID = `select_${name}`
  const [field, meta, helpers] = useField(name ?? "");
  const [values, setValues] = useState(defaultValue || [])
  console.log(field.value)
  console.log(values)



  const getItemValue = (value: number | string) => {
    const found = items.find((ele) => ele[valueRef] === value)
    return found ? found[keyRef] : value
  }

  const handleDelete = (value: any) => {

    if (values) {
      const newValues = values.filter((v: any) => v !== value)
      setValues(newValues)
      helpers.setValue(newValues)
    }
  }

  const valueIsChecked = (value: any, item: any) => {
    if (!value) {
      return false
    }
    return value.includes(item)
  }

  const renderInputSelectedValues = (selected: any) => {
    if (chips) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((v: any) => (
            <ChipItem
              key={v}
              label={getItemValue(v)}
              onMouseDown={(event) => event.stopPropagation()}
              deleteIcon={<CloseIcon style={{ color: '#F68B1E' }} />}
              onDelete={() => handleDelete(v)}
            />
          ))}
        </Box>
      )
    }
    return selected.map((v: number | string) => getItemValue(v)).join(', ')
  }

  const handleChange = (key: any) => {
    const add = !values.includes(key)

    let newValue: string[]
    if (add) {
      newValue = [...values, key]
    } else {
      newValue = values.filter((v: any) => v !== key)
    }
    setValues(newValue)
    helpers.setValue(newValue)
  }

  const [open, setOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  return (
    <FormControl fullWidth disabled={disabled}>
      {label && disableDefaultLabel && (
        <Box sx={{ margin: '0 0 7px 0', color: 'black' }}>
          <Typography
            variant="body1"
            sx={{ fontSize: '16px', display: 'inline' }}
          >
            {label}
          </Typography>
          {showInputInfo && (
            <Tooltip title={inputInfo}>
              <Icon
                sx={{
                  color: 'primary.main',
                  margin: '0 0 -6px 5px',
                }}
              >
                info
              </Icon>
            </Tooltip>
          )}
        </Box>
      )}
      {!disableDefaultLabel && (
        <InputLabel id={labelID} htmlFor={name}>
          {label}
        </InputLabel>
      )}
      <>
        <Select
          id={name}
          fullWidth
          readOnly
          label={disableDefaultLabel ? undefined : label}
          labelId={labelID}
          variant="outlined"
          value={values || ''}

          onClick={handleClick}
          renderValue={renderInputSelectedValues}
          defaultValue={defaultValue || ''}
          data-testid={name}
        />
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuList >
            {items.map((item) => (
              <MenuItem

                onClick={() => handleChange(item[valueRef])}
                sx={{ width: '200px' }}
                key={item[keyRef]}
                value={item[keyRef]}
              >
                {
                  // if chips are enabled, display also checkbox on the list
                  chips ? (
                    <>
                      <Checkbox
                        sx={{ padding: '0px 5px 0px 0px' }}
                        checked={valueIsChecked(values, item.value)}
                      />
                      <ListItemText primary={item[keyRef]} />
                    </>
                  ) : (
                    item[valueRef]
                  )
                }
              </MenuItem>
            ))}
          </MenuList>
          <Divider />
          <Button
            fullWidth
            onClick={() => setOpen(false)}
            sx={{ marginTop: '6px' }}
          >
            Close
          </Button>
        </Menu>
      </>

      {meta.error && (
        <Box
          ml="5px"
          mt="5px"
          fontWeight="500"
          fontSize="14px"
          color="error.main"
        >
          {meta.error}
        </Box>
      )}
    </FormControl>
  )
}

export default MultiSelectInput
