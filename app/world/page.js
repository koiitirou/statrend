import { Box } from '@mui/material';
import ResBar from 'components/layout/resbar';
import World_rank from './world_rank';
import wor_path from 'components/wor/wor_path.json';
export const metadata = {
  title: 'World rankings for statistics by countries',
  description: 'Explore time-series data, maps, graphs & rankings on all countries in the world.',
};
export default function Home() {
  return (
    <Box>
      <ResBar />
      <World_rank wor_path={wor_path} />
    </Box>
  );
}
