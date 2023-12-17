'use client';

import Bc3 from 'components/layout/bc3';
import theme from 'theme';
import { Box, Typography, Grid, Button, Slider } from '@mui/material';
import React from 'react';
import Link from 'next/link';

const rep1 = {
  world: 'world ranking',
  country: 'country',
};

const World_country = ({ res2, country, wor_category1, array6, wor_path }) => {
  // console.log(res2);
  // console.log(array6);
  // console.log(wor_path);
  // console.log(wor_category1);
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
      <Typography variant='h1'>
        {res2.enm} Statistical Data Ranking - {country[1]}
      </Typography>
      <Button
        color='secondary'
        variant={country[1] == 'summary' ? 'contained' : 'outlined'}
        fontSize={{ xs: '13px', sm: '16px' }}
        //prefetch={false}
        href={'/world/country/' + country[0]}
      >
        summary
      </Button>
      {wor_path.topic.map((v, i) => {
        return (
          <React.Fragment key={i + 'a'}>
            <Button
              color='secondary'
              variant={country[1] == v.ne1 ? 'contained' : 'outlined'}
              fontSize={{ xs: '13px', sm: '16px' }}
              // prefetch={false}
              href={'/world/country/' + country[0] + '/' + v.ne1}
            >
              {v.ne1}
            </Button>
          </React.Fragment>
        );
      })}
      <Typography variant='body1'>
        This page summarizes {res2.enm} statistical data rankings such as economy, area, population,
        etc.
      </Typography>
      <Typography variant='h2'>
        {res2.enm} {country[1]}
      </Typography>
      <Grid container spacing={0.5} columns={12}>
        <Grid item xs={4.5}>
          <Typography variant='body1' fontSize={{ xs: '13px', sm: '16px' }}>
            Category
          </Typography>
        </Grid>
        <Grid item xs={4.5}>
          <Typography variant='body1' fontSize={{ xs: '13px', sm: '16px' }}>
            Value
          </Typography>
        </Grid>
        <Grid item xs={1.5}>
          <Typography variant='body1' fontSize={{ xs: '13px', sm: '16px' }}>
            Rank
          </Typography>
        </Grid>
        <Grid item xs={1.5}>
          <Typography variant='body1' fontSize={{ xs: '13px', sm: '16px' }}>
            Year
          </Typography>
        </Grid>

        {res2.it0[0] != undefined &&
          res2.it0.map(({ nm2, nme, val, unt, url, rnk, tim }) => {
            return (
              <React.Fragment key={url}>
                <Grid item xs={4.5} borderTop={1} borderColor='#ddd'>
                  <Typography variant='body1' fontSize={{ xs: '12px', sm: '14px' }}>
                    {nme}
                  </Typography>
                </Grid>
                <Grid item xs={4.5} borderTop={1} borderColor='#ddd'>
                  <Typography variant='body1' fontSize={{ xs: '12px', sm: '14px' }}>
                    {Number(val).toLocaleString()} {unt}
                  </Typography>
                </Grid>
                <Grid item xs={1.5} borderTop={1} borderColor='#ddd'>
                  <Typography variant='body1' fontSize={{ xs: '12px', sm: '14px' }}>
                    <Link prefetch={false} href={'/world/category/' + url}>
                      {rnk}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={1.5} borderTop={1} borderColor='#ddd'>
                  <Typography variant='body1' fontSize={{ xs: '12px', sm: '14px' }}>
                    {tim}
                  </Typography>
                </Grid>
              </React.Fragment>
            );
          })}
      </Grid>
    </Box>
  );
};
export default World_country;
