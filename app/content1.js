'use client';

import { Box, Typography, Card, CardContent, CardHeader, CardActionArea } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PublicIcon from '@mui/icons-material/Public';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PlaceIcon from '@mui/icons-material/Place';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import theme from 'theme';

const Content1 = () => {
  return (
    <Blogcard
      href1='/world/'
      title1='World data ranking'
      sub1='World time-series data ranking: population, economy, gender, etc'
      icon1={<EqualizerIcon sx={{ fill: '#007FFF' }} fontSize='large' />}
    />
  );
};

const Blogcard = (props) => {
  return (
    <Box
      sx={{
        p: 1,
        maxWidth: '1300px',
        width: 'auto',
        margin: 'auto',

        [theme.breakpoints.up('md')]: { width: '67%', margin: 'auto' },
      }}
    >
      <CardActionArea href={props.href1}>
        <Card sx={{ display: 'flex', marginBottom: '15px' }}>
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {props.icon1}
          </CardContent>
          <CardHeader
            sx={{
              display: 'flex',
              flex: '1',
            }}
            title={
              <Typography fontWeight='bold' fontSize={{ xs: '16px', md: '18px' }}>
                {props.title1}
              </Typography>
            }
            subheader={
              <Typography color='dimgrey' fontSize={{ xs: '12px', md: '14px' }}>
                {props.sub1}
              </Typography>
            }
          ></CardHeader>

          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ArrowForwardIosIcon />
          </CardContent>
        </Card>
      </CardActionArea>
    </Box>
  );
};

export default Content1;
