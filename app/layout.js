import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from 'components/layout/footer';
import ThemeRegistry from './ThemeRegistry';
import GoogleAnalytics from 'components/google/googleanalytics';
export const metadata = {
  title: {
    template: '%s | StaTrend',
    default: 'World time-series data ranking| StatTrend',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <CssBaseline />
      <GoogleAnalytics />
      <Box component='body'>
        <ThemeRegistry options={{ key: 'mui' }}>
          <Box sx={{ minHeight: '100vh' }}>{children}</Box>
          <Footer />
        </ThemeRegistry>
      </Box>
    </html>
  );
}
