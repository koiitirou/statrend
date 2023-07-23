// import './globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { Link, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from 'components/layout/footer';

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
      <Box component='body'>
        <Box sx={{ minHeight: '100vh' }}>{children}</Box>
        <Footer />
      </Box>
    </html>
  );
}
