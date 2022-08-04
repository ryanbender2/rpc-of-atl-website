import { useTheme, ThemeProvider, createTheme, ThemeOptions, responsiveFontSizes } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState } from 'react';


export function getTheme(mode: 'light' | 'dark') {
    return responsiveFontSizes(createTheme({
        palette: {
            mode: mode,
            primary: {
                main: '#f46857',
            },
            secondary: {
                main: '#6757F4',
            }
        },
    }));
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
