import { Box } from '@mui/material';
import ResBar from 'components/layout/resbar';
import cls1 from 'components/wor/location_df10.json';
import World_rank from './world_rank';

export const metadata = {
  description: 'Explore time-series data, maps, graphs & rankings on all countries in the world.',
};
export default function Home() {
  return (
    <Box>
      <ResBar />
      <World_rank />
    </Box>
  );
}
