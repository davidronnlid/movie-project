import createTheme from '@mui/material/styles/createTheme'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

interface FontThemeProps {
  children: JSX.Element | JSX.Element[]
}

const FontTheme: React.FC<FontThemeProps> = ({
  children,
}: FontThemeProps): JSX.Element => {
  let theme = createTheme({
    typography: {
      fontFamily: ['Roboto condensed', 'sans-serif'].join(','),
    },
  })
  theme = responsiveFontSizes(theme)

  theme.typography.h1 = {
    fontSize: '8vw',
    [theme.breakpoints.up('sm')]: {
      fontSize: '4vw',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3vw',
    },
  }

  theme.typography.h3 = {
    fontSize: '4vw',

    [theme.breakpoints.up('md')]: {
      fontSize: '2.9vw',
    },
  }

  theme.typography.h4 = {
    fontSize: '6vw',

    [theme.breakpoints.up('sm')]: {
      fontSize: '3vw',
    },
  }

  theme.typography.body1 = {
    fontSize: '4vw',
    fontFamily: "'Roboto Condensed', sans-serif",
    [theme.breakpoints.up('sm')]: {
      fontSize: '2vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.7vw',
    },
  }

  theme.typography.body2 = {
    fontSize: '4vw',
    fontFamily: "'Roboto Condensed', sans-serif",
    [theme.breakpoints.up('sm')]: {
      fontSize: '2vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1vw',
    },
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default FontTheme
