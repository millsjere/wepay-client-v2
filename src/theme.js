import { createTheme } from '@mui/material/styles';

export const theme = createTheme({

    typography: {
        fontFamily: "Plus Jakarta Sans",
        fontWeightRegular: 400,
        fontSize: 13
    },
    palette: {
        primary: {
            main: '#f6a200',

        },
        secondary: {
            main: '#3f5176'
        },
        light: {
            main: '#fff'
        }
    },
    primaryColorBlue: '#3eb7e4',
    primaryColorOrange: '#f6a200',
    secondaryColorDark: '#24324d',
    secondaryColorDark2: '#111827',
    contentBackground: '#e3f2fd78'
})