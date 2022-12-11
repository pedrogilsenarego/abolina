// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import PickersDay, {
  PickersDayProps,
  pickersDayClasses,
} from '@mui/lab/PickersDay'
import { Box as box, styled, TextField as textField } from '@mui/material'
import dayjs from 'dayjs'

interface Props {
  startDateProps: DateProps
  endDateProps: DateProps
}

interface DateProps {
  value: Date | null
  handleChange: (event: any) => void
  inputLabel: string
  defaultValue?: Date | null
}

const CustomDatePicker = styled(DatePicker)(() => ({
  '& .MuiPaper-root': {
    backgroundColor: 'white',
  },
  '& .MuiPickersDay-root': {
    backgroundColor: 'white',
  },

  '& .MuiCalendarPicker-root': {
    backgroundColor: 'white',
  },
}))

const TextField = styled(textField)(({ theme }) => ({
  maxWidth: '180px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: 'initial',
  },
}))

const Box = styled(box)(({ theme }) => ({
  maxWidth: '120px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: 'initial',
    width: '50%',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '150px',
  },
}))

const StartEndDateFilter = ({ startDateProps, endDateProps }: Props) => {
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)

  const [startOpened, setStartOpened] = useState<boolean>(false)
  const [endOpened, setEndOpened] = useState<boolean>(false)

  const renderWeekPickerDay = (
    date1: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => (
    <PickersDay
      {...pickersDayProps}
      sx={{
        [`&&.${pickersDayClasses.selected}`]: {
          backgroundColor: 'orange',
        },
      }}
    />
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <CustomDatePicker
          renderDay={renderWeekPickerDay}
          inputFormat="yyyy-MM-dd"
          clearable
          label={startDateProps.inputLabel}
          onChange={(value: Date | null) => {
            if (value === null) {
              setStartDate(null)
              startDateProps.handleChange(null)
              return
            }
            const newDate = dayjs(value).format('YYYY-MM-DD')
            if (newDate === 'Invalid Date') {
              startDateProps.handleChange(null)
              return
            }
            setStartDate(newDate)
            startDateProps.handleChange(newDate)
          }}
          value={startDateProps.defaultValue || startDate}
          open={startOpened}
          onOpen={() => setStartOpened(true)}
          onClose={() => setStartOpened(false)}
          renderInput={(params) => (
            <TextField
              fullWidth
              onClick={() => setStartOpened(true)}
              variant="outlined"
              {...params}
              value={startDate || ''}
            />
          )}
        />
      </Box>
      <Box>
        <CustomDatePicker
          renderDay={renderWeekPickerDay}
          inputFormat="yyyy-MM-dd"
          clearable
          label={endDateProps.inputLabel}
          value={endDateProps.defaultValue || endDate}
          onChange={(value: Date | null) => {
            if (value === null) {
              setEndDate(null)
              endDateProps.handleChange(null)
              return
            }
            const newDate = dayjs(value).format('YYYY-MM-DD')
            if (newDate === 'Invalid Date') {
              endDateProps.handleChange(null)
              return
            }
            setEndDate(newDate)
            endDateProps.handleChange(newDate)
          }}
          open={endOpened}
          onOpen={() => setEndOpened(true)}
          onClose={() => setEndOpened(false)}
          renderInput={(params) => (
            <TextField
              fullWidth
              onClick={() => setEndOpened(true)}
              variant="outlined"
              {...params}
              value={endDate || ''}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  )
}
export default StartEndDateFilter
