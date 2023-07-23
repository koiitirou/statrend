import Image from 'next/image';
import { Box, Container } from '@mui/material';
import ResBar from 'components/layout/resbar';
import HideBar from 'components/layout/hidebar';
import CssBaseline from '@mui/material/CssBaseline';

export const metadata = {
  description: 'Explore time-series data, maps, graphs & rankings on all countries in the world.',
};
export default function Home() {
  return (
    <Box>
      <ResBar /> Hello
    </Box>
  );
}
