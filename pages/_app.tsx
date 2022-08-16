import type { AppProps } from 'next/app'
import { getTheme, ColorModeContext } from '../lib/theme'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useMemo, useState } from 'react'
import ColorModeToggle from '../components/ColorModeToggle'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps }: AppProps) {
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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Container disableGutters style={{ minWidth: '100%' }}>
          <ColorModeToggle />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
