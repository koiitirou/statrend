import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography } from '@mui/material/Box';
import Link from 'next/link';

const StaticAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            StaTrend
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default StaticAppBar;
