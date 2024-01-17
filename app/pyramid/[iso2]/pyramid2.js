'use client';

import Link from 'next/link';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Windowed from './pyramid_windowed';
import theme from 'theme';
import Bc3 from 'components/layout/bc3';
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  Surface,
  Symbols,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
  AreaChart,
  Area,
} from 'recharts';
import { Box, Typography, Grid, Chip } from '@mui/material';
//import e0 from 'public/comp/data/pop/y5out/AD.json';
import Slider from '@mui/material/Slider';
import { useState, useEffect, memo } from 'react';
import classes from 'components/css/pyramid.module.css';
const rep1 = {
  pyramid: 'population pyramid',
};

const toPercent = (decimal, fixed1 = 0) => `${(decimal * 100).toFixed(fixed1)}%`;
const toPercent2 = (decimal) => `${(decimal * 100).toFixed(0)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const rsp1 = {
  y: '0-14',
  m: '15-64',
  o: '65-',
};

const renderColorfulLegendText = (value, entry) => {
  const { color } = entry;

  return <span style={{ color }}>{rsp1[value]}</span>;
};

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => result + entry.value, 0);
  return (
    <div className='squaire-toolbox'>
      <Box
        sx={{
          backgroundColor: 'white',
          opacity: '0.9',
          padding: '5px 10px 5px 10px',
        }}
      >
        <Typography className='total'>{`${label} (Total: ${total.toLocaleString()} )`}</Typography>
        <Grid container rowspacing={1} columns={6} columnSpacing={1} maxWidth='300px'>
          {[...payload].reverse().map((entry, index) => (
            <React.Fragment key={`item-${index}`}>
              <Grid item xs={1.5}>
                <Typography sx={{ fontSize: '1.2em', color: entry.color }}>
                  {`${rsp1[entry.name]}`}
                </Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography sx={{ fontSize: '1.2em', color: entry.color }} align='right'>
                  {`${entry.value.toLocaleString()}`}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontSize: '1.2em', color: entry.color }} align='right'>
                  {`${getPercent(entry.value, total)}`}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

const renderLabelFemale = (props) => {
  return `${(Number(props) * -1).toFixed(1)}%`;
};
const renderLabelMale = (props) => {
  return `${Number(props).toFixed(1)}%`;
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div id='custom-tooltip-toolbox' className='squaire-toolbox'>
        <Box
          sx={{
            backgroundColor: 'white',
            opacity: '0.9',
            padding: '5px 10px 5px 10px',
          }}
        >
          <Typography
            sx={{ fontSize: '1.2em', color: 'dimgrey' }}
          >{`${payload[0].payload.l}`}</Typography>
          <span style={{ fontSize: '1.3em', color: '#EE7989' }}>
            {`${payload[0].payload.f.toLocaleString()}`}
          </span>
          {'  '}
          <span style={{ fontSize: '1.3em', color: 'steelblue' }}>
            {`${payload[1].payload.m.toLocaleString()}`}
          </span>
        </Box>
      </div>
    );
  }

  return null;
};

const Pyramid2 = (props) => {
  const con_name = props.res3.params.name;

  const e0 = props.res2;
  const d0 = e0[0];
  const d1 = d0.val;
  const l0 = e0[e0.length - 1];
  const d1yrs = d0.yrs;
  const dmx1 = d1.mx + 2;
  const dmx2 = dmx1 * -1;
  const chartData = [];
  const marks = [];
  const data1 = [];
  e0.forEach((v) => {
    //marks.push({ value: Number(v.yrs), label: v.yrs });
    marks.push({ value: Number(v.yrs) });
    data1.push({ x: Number(v.yrs), y: v.val.ct.y, m: v.val.ct.m, o: v.val.ct.o });
    chartData.push({ year: Number(v.yrs), Population: v.val.pp });
  });

  const [value, setValue] = useState(d1yrs);
  const [def, setDef] = useState(d1);
  const [pop, setPop] = useState(d1.pf);
  useEffect(() => {
    if (e0.find((s) => s.yrs == value) != undefined) {
      setDef(e0.find((s) => s.yrs == value).val);
      setPop(e0.find((s) => s.yrs == value).val.pf);
    }
  }, [value, e0]);
  const handleChange = (event, value) => {
    if (typeof value === 'number') {
      setValue(value);
    }
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
      <Windowed />
      <Typography variant='body1'>
        <KeyboardDoubleArrowRightIcon sx={{ verticalAlign: 'bottom' }} />
        <Link prefetch={false} href={'https://www.statja.com/pyramid/' + props.iso2}>
          Japanese Version
        </Link>
      </Typography>
      <Pyramid3 e0={e0} con_name={con_name} marks={marks} />
      <Pyramid4 e0={e0} con_name={con_name} marks={marks} />

      <Typography conmponent='h2' variant='h2'>
        Trends of Total Population | {con_name} {d1yrs}-{l0.yrs}年
      </Typography>
      <ResponsiveContainer height={400}>
        <LineChart
          width={600}
          height={400}
          data={chartData}
          margin={{
            top: 5,
            right: 5,
            left: -50,
            bottom: 5,
          }}
        >
          <Line type='monotone' dataKey='Population' stroke='#8884d8' dot={{ r: 0 }} />
          <XAxis dataKey='year' tick={{ fontSize: 12 }} />
          <YAxis
            domain={['auto', 'auto']}
            tickMargin={0}
            tick={{ fontSize: 12, dx: 43, dy: -7, width: 0 }}
            orientation='left'
            tickFormatter={(tick) => {
              if (tick >= 1000 && tick < 1000000) return Number(tick.toPrecision(3)) / 1000 + 'K';
              else if (tick >= 1000000 && tick < 1000000000)
                return Number(tick.toPrecision(3)) / 1000000 + 'M';
              else if (tick >= 1000000000) return Number(tick.toPrecision(3)) / 1000000000 + 'B';
              else return tick;
            }}
          />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value) + ''} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
      <Typography conmponent='h2' variant='h2'>
        Segment of Population Trends | {con_name} {d1yrs}-{l0.yrs}
      </Typography>
      <ResponsiveContainer height={400}>
        <AreaChart
          width={600}
          height={400}
          data={data1}
          stackOffset='expand'
          margin={{
            top: 5,
            right: 5,
            left: -50,
            bottom: 5,
          }}
          style={{
            fontSize: '0.8em',
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='x' />
          <Tooltip content={renderTooltipContent} />
          <Area type='monotone' dataKey='y' stackId='1' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='m' stackId='1' stroke='#82ca9d' fill='#82ca9d' />
          <Area type='monotone' dataKey='o' stackId='1' stroke='#ffc658' fill='#ffc658' />
          <YAxis
            tickMargin={0}
            tick={{ fontSize: 12, dx: 43, dy: -7, width: 0 }}
            orientation='left'
            tickFormatter={toPercent2}
          />
          <Legend formatter={renderColorfulLegendText} />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
export default Pyramid2;

const Pyramid3 = (props) => {
  const marks = props.marks;
  const con_name = props.con_name;
  const e0 = props.e0;
  //const d0 = e0[0];
  const cyr1 = new Date().getFullYear();
  const reminder = cyr1 % 5;
  const cyr2 = cyr1 - reminder;
  const c0 = e0.find((v, i) => v.yrs == cyr1);
  const b0 = e0.find((v, i) => v.yrs == cyr2);
  const d0 = c0 != undefined ? c0 : b0 != undefined ? b0 : e0[0];
  const d0yrs = e0[0].yrs;
  const d1yrs = d0.yrs;
  const d1 = d0.val;
  const l0 = e0[e0.length - 1];
  const dmx1 = d1.mx + 2;
  const dmx2 = dmx1 * -1;
  const chartData = [];

  const [value, setValue] = useState(d1yrs);
  const [def, setDef] = useState(d1);
  const [pop, setPop] = useState(d1.pf);
  useEffect(() => {
    if (e0.find((s) => s.yrs == value) != undefined) {
      setDef(e0.find((s) => s.yrs == value).val);
      setPop(e0.find((s) => s.yrs == value).val.pf);
    }
  }, [value, e0]);
  const handleChange = (event, value) => {
    if (typeof value === 'number') {
      setValue(value);
    }
  };
  return (
    <Box>
      <Typography conmponent='h2' variant='h2'>
        Population Pyramid | {con_name} {d0yrs}-{l0.yrs}
      </Typography>
      <ResponsiveContainer height={400}>
        <BarChart
          layout='vertical'
          stackOffset='sign'
          width={600}
          height={400}
          data={def.dt}
          margin={{
            top: 5,
            right: 5,
            left: -50,
            bottom: 5,
          }}
          style={{
            fontSize: '0.8em',
          }}
          barCategoryGap={0}
        >
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          <XAxis
            type='number'
            tickFormatter={(tick) => {
              if (tick < 0) return Number(tick) * -1;
              else return Number(tick);
            }}
            domain={[dmx2, dmx1]}
          />

          <Tooltip content={CustomTooltip} />
          <Legend />
          <YAxis
            interval={0}
            tickMargin={0}
            tick={{ fontSize: 12, dx: 43, dy: 0, width: 0 }}
            orientation='left'
            type='category'
            dataKey='l'
          />
          <ReferenceLine y={0} stroke='#000' />

          <Bar name='Female' dataKey='g' stackId='b' fill='#EE7989'>
            <LabelList
              dataKey='g'
              position='right'
              formatter={renderLabelFemale}
              style={{
                fill: 'rgb(102, 102, 102)',
              }}
            />
          </Bar>
          <Bar name='Male' dataKey='n' stackId='b' fill='steelblue'>
            <LabelList
              dataKey='n'
              position='right'
              formatter={renderLabelMale}
              style={{
                fill: 'rgb(102, 102, 102)',
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Box maxWidth='600px'>
        <Box margin='auto' padding='0px 50px'>
          <Typography gutterBottom sx={{ paddingRight: '0px' }}>
            <span>Population： </span>
            <span style={{ fontWeight: 'bold' }}>{pop}</span>
          </Typography>
          <Typography display='inline' gutterBottom sx={{ paddingRight: '0px' }}>
            Year: <span style={{ fontWeight: 'bold' }}>{value}</span>　
          </Typography>
          <Chip
            label='－'
            size='small'
            variant='outlined'
            onClick={() => {
              const ind1 = marks.findIndex((ss) => ss.value == value);
              marks[ind1 - 1] ? setValue(marks[ind1 - 1].value) : null;
            }}
          />{' '}
          <Chip
            label='＋'
            size='small'
            variant='outlined'
            onClick={() => {
              const ind1 = marks.findIndex((ss) => ss.value == value);
              marks[ind1 + 1] ? setValue(marks[ind1 + 1].value) : null;
            }}
          />
          <Slider
            value={Number(value)}
            aria-label='non-linear-slider'
            defaultValue={Number(d1yrs)}
            min={Number(d0yrs)}
            max={Number(l0.yrs)}
            //valueLabelFormat={valueLabelFormat}
            //getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay='auto'
            marks={marks}
            onChange={handleChange}
            /* onChangeCommitted={handleChangeCommitted} */
          />
        </Box>
      </Box>
    </Box>
  );
};

/////
const Pyramid4 = (props) => {
  const marks = props.marks;
  const con_name = props.con_name;
  const e0 = props.e0;
  //const d0 = e0[0];
  const cyr1 = new Date().getFullYear();
  const reminder = cyr1 % 5;
  const cyr2 = cyr1 - reminder;
  const c0 = e0.find((v, i) => v.yrs == cyr1);
  const b0 = e0.find((v, i) => v.yrs == cyr2);
  const d0 = c0 != undefined ? c0 : b0 != undefined ? b0 : e0[0];
  const d0yrs = e0[0].yrs;
  const d1yrs = d0.yrs;
  const d1 = d0.val;
  const l0 = e0[e0.length - 1];
  const dmx1 = d1.mx + 2;
  const dmx2 = dmx1 * -1;
  const chartData = [];

  const [value, setValue] = useState(d1yrs);
  const [def, setDef] = useState(d1);
  const [pop, setPop] = useState(d1.pf);
  useEffect(() => {
    if (e0.find((s) => s.yrs == value) != undefined) {
      setDef(e0.find((s) => s.yrs == value).val);
      setPop(e0.find((s) => s.yrs == value).val.pf);
    }
  }, [value, e0]);
  const handleChange = (event, value) => {
    if (typeof value === 'number') {
      setValue(value);
    }
  };

  return (
    <Box>
      <Typography conmponent='h2' variant='h2'>
        Table of Population Pyramid (5-year age group) | {con_name} {d0yrs}-{l0.yrs}
      </Typography>
      <Box maxWidth='600px'>
        <Box margin='auto' padding='0px 50px'>
          <Typography gutterBottom sx={{ paddingRight: '0px' }}>
            <span>Population： </span>
            <span style={{ fontWeight: 'bold' }}>{pop}</span>
          </Typography>
          <Typography display='inline' gutterBottom sx={{ paddingRight: '0px' }}>
            Year: <span style={{ fontWeight: 'bold' }}>{value}</span>　
          </Typography>
          <Chip
            label='－'
            size='small'
            variant='outlined'
            onClick={() => {
              const ind1 = marks.findIndex((ss) => ss.value == value);
              marks[ind1 - 1] ? setValue(marks[ind1 - 1].value) : null;
            }}
          />{' '}
          <Chip
            label='＋'
            size='small'
            variant='outlined'
            onClick={() => {
              const ind1 = marks.findIndex((ss) => ss.value == value);
              marks[ind1 + 1] ? setValue(marks[ind1 + 1].value) : null;
            }}
          />
          <Slider
            value={Number(value)}
            aria-label='non-linear-slider'
            defaultValue={Number(d1yrs)}
            min={Number(d0yrs)}
            max={Number(l0.yrs)}
            //valueLabelFormat={valueLabelFormat}
            //getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay='auto'
            marks={marks}
            onChange={handleChange}
            /* onChangeCommitted={handleChangeCommitted} */
          />
        </Box>
      </Box>
      <Box className={classes.retable}>
        <table>
          <thead>
            <tr>
              <th>Age</th>
              <th>Female</th>
              <th>Male</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {def.dt.map((v1, i1) => {
              return (
                <tr key={'h' + i1}>
                  <td>{v1.l}</td>
                  <td>{v1.f.toLocaleString()}</td>
                  <td>{v1.m.toLocaleString()}</td>
                  <td>{(Number(v1.m) + Number(v1.f)).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};
