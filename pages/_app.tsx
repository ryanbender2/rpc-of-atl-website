import type { AppProps } from 'next/app'
import { getTheme, ColorModeContext } from '../lib/theme'
import { Box, Container, CssBaseline, Grid, ThemeProvider } from '@mui/material'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { createContext, useMemo, useState } from 'react'
import ColorModeToggle from '../components/ColorModeToggle'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { User } from 'firebase/auth'
import { userContext } from '../lib/context'
import { ToastContainer } from 'react-toastify'

import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth)
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () => getTheme(mode),
    [mode],
  );

  return (
    <userContext.Provider value={user}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <ColorModeToggle />
          <Box
            display='flex'
            flexDirection='column'
            height='100%'
          >
            <Header />
            <Box flex='1 0 auto'>
              <Component {...pageProps} />
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </userContext.Provider>
  )
}
