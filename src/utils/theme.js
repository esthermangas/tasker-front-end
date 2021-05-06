import { createMuiTheme } from '@material-ui/core';

const defaultTheme = createMuiTheme({
  overrides: {
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: '#3d3d43',
        textTransform: 'uppercase',
      },
      dayLabel: {
        textTransform: 'uppercase',
        color: 'white',
      },
      iconButton: {
        backgroundColor: '#3d3d43',
        '&:hover': {
          backgroundColor: '#5f5e5e',
        },
      },
    },
    MuiPickersDatePickerRoot: {
      toolbar: {
        backgroundColor: '#37485a',
      },
    },
    MuiButton: {
      label: {
        color: '#E52A9D',
      },
    },
    MuiPickersDay: {
      day: {
        color: '#999',
      },
      daySelected: {
        backgroundColor: '#EAAE75',
        '&:hover': {
          backgroundColor: '#E52A9D',
        },
      },
    },
    MuiTypography: {
      root: {
        color: 'white',
      },
    },
    MuiSvgIcon: {
      root: {
        fill: '#E52A9D',
      },
    },
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderWidth: 0,
        },
        '&:hover $notchedOutline': {
          borderWidth: 0,
        },
        '&$focused $notchedOutline': {
          borderWidth: 0,
        },
        border: '1px solid #EAAE75',
        borderRadius: '6px',
      },
      input: {
        padding: '9px 10px',
        fontSize: '14px',
        fontFamily: '"Raleway", sans-serif',
        letterSpacing: '1px',
        fontWeight: '500',
        cursor: 'pointer',
        color: 'white',
      },
    },
    MuiInputBase: {
      input: {
        color: 'white',
        outline: 'none',
        '&:focus': {
          outline: 'none',
        },
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: '#3d3d43',
      },
    },
    MuiDialogActions: {
      root: {
        backgroundColor: '#3d3d43',
      },
    },
  },
});

export default defaultTheme;
