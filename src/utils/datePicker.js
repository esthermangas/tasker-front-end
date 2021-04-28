import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { DatePicker } from '@material-ui/pickers';
import { InputAdornment } from '@material-ui/core';
import { BiCalendar } from 'react-icons/all';
import defaultTheme from './theme';

const DatePickerTask = (props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <DatePicker
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <BiCalendar size="20" color="#EA6CBA" />
            </InputAdornment>
          ),
        }}
      />
    </ThemeProvider>
  );
};

export default DatePickerTask;
