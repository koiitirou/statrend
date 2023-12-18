'use client';
import Bc3 from 'components/layout/bc3';
import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Slider,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import theme from 'theme';
import { Fragment } from 'react';
import wor1 from 'components/wor/world_ranking_summary.json';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';

const World_rank = () => {
  const rep1 = {
    world: 'world ranking',
  };
  return (
    <Box
      sx={{
        p: 1,
        maxWidth: '1300px',
        width: 'auto',
        margin: 'auto',
        [theme.breakpoints.up('md')]: { maxWidth: '67%' },
      }}
    >
      <Bc3 rep1={rep1} />
      <Grid container spacing={0.5} columns={{ xs: 12, sm: 12 }} key={'grid1'}>
        {wor1.map((s1, i1) => (
          <Fragment key={'h' + i1}>
            <Typography
              variant='h2'
              component='h2'
              sx={{
                flexBasis: '100%',
                marginTop: '15px',
                marginBottom: '5px',
                marginLeft: '10px',
                textTransform: 'capitalize',
              }}
            >
              {s1.tpu}
            </Typography>
            <Grid item xs={6} sm={5}>
              <Typography component='body1' fontSize={{ xs: '13px', sm: '16px' }}>
                Cateogry
              </Typography>
            </Grid>
            <Grid item xs={1.8} sm={1.4}>
              <Typography component='body1' fontSize={{ xs: '13px', sm: '16px' }}>
                #1
              </Typography>
            </Grid>
            <Grid item xs={1.8} sm={1.4}>
              <Typography component='body1' fontSize={{ xs: '13px', sm: '16px' }}>
                #2
              </Typography>
            </Grid>
            <Grid item xs={1.8} sm={1.4}>
              <Typography component='body1' fontSize={{ xs: '13px', sm: '16px' }}>
                #3
              </Typography>
            </Grid>
            <Grid item xs={1.8} sm={1.4} display={{ xs: 'none', sm: 'block' }}>
              <Typography component='body1' fontSize={{ xs: '13px', sm: '16px' }}>
                #4
              </Typography>
            </Grid>
            <Grid item xs={1.3} sm={0.9} display={{ xs: 'none', sm: 'block' }}>
              <Typography
                component='body1'
                fontSize={{ xs: '13px', sm: '16px' }}
                display={{ xs: 'none', sm: 'block' }}
              >
                Year
              </Typography>
            </Grid>
            {s1.it0.map((s2, i2) => (
              <Fragment key={'i' + i2}>
                <Grid item xs={6} sm={5} borderTop={1} borderColor='#ddd'>
                  <Typography component='body1' fontSize={{ xs: '13px', sm: '16px' }}>
                    <AnalyticsRoundedIcon sx={{ verticalAlign: 'bottom' }} />
                    <Link
                      href={'/world/category/' + s2.idu}
                      prefetch={false}
                      style={{ textDecoration: 'none' }}
                    >
                      {s2.ide}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={1.8} sm={1.4} borderTop={1} borderColor='#ddd'>
                  <Typography component='body1' fontSize={{ xs: '12px', sm: '14px' }}>
                    <img src={'/img/wlogo/' + s2.dat[0].l + '.png'} width={18}></img>
                    <Link
                      href={'/world/country/' + s2.dat[0].i}
                      prefetch={false}
                      style={{ textDecoration: 'none' }}
                    >
                      {s2.dat[0].e}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={1.8} sm={1.4} borderTop={1} borderColor='#ddd'>
                  <Typography component='body1' fontSize={{ xs: '12px', sm: '14px' }}>
                    <img src={'/img/wlogo/' + s2.dat[1].l + '.png'} width={18}></img>

                    <Link
                      href={'/world/country/' + s2.dat[1].i}
                      prefetch={false}
                      style={{ textDecoration: 'none' }}
                    >
                      {s2.dat[1].e}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={1.8} sm={1.4} borderTop={1} borderColor='#ddd'>
                  <Typography component='body1' fontSize={{ xs: '12px', sm: '14px' }}>
                    <img src={'/img/wlogo/' + s2.dat[2].l + '.png'} width={18}></img>

                    <Link
                      href={'/world/country/' + s2.dat[2].i}
                      prefetch={false}
                      style={{ textDecoration: 'none' }}
                    >
                      {s2.dat[2].e}
                    </Link>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1.8}
                  sm={1.4}
                  borderTop={1}
                  borderColor='#ddd'
                  display={{ xs: 'none', sm: 'block' }}
                >
                  <Typography component='body1' fontSize={{ xs: '12px', sm: '14px' }}>
                    <img src={'/img/wlogo/' + s2.dat[3].l + '.png'} width={18}></img>

                    <Link
                      href={'/world/country/' + s2.dat[3].i}
                      prefetch={false}
                      style={{ textDecoration: 'none' }}
                    >
                      {s2.dat[3].e}
                    </Link>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1.3}
                  sm={0.9}
                  borderTop={1}
                  borderColor='#ddd'
                  display={{ xs: 'none', sm: 'block' }}
                >
                  <Typography component='body1' fontSize={{ xs: '12px', sm: '14px' }}>
                    {s2.tmx}
                  </Typography>
                </Grid>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default World_rank;
