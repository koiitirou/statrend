import { Box } from '@mui/material';
import ResBar from 'components/layout/resbar';
import Content1 from './content1';

export const metadata = {
  description: 'Explore time-series data, maps, graphs & rankings on all countries in the world.',
};
export default function Home() {
  return (
    <Box>
      <ResBar />
      <Content1 />
    </Box>
  );
}
