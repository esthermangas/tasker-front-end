import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { DatePicker } from '@material-ui/pickers';
import defaultTheme from './theme';

const DatePickerTask = (props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <DatePicker {...props} />
    </ThemeProvider>
  );
};

export default DatePickerTask;
