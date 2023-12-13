'use client';

import Map1 from './world_map';
import { Box, Typography, Chip, Slider } from '@mui/material';

import theme from 'theme';
import Link from 'next/link';
import classes from 'components/css/world.module.css';
import { json } from 'd3-fetch';
import { server } from 'components/data/config';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState, Fragment, useRef, useEffect, memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Surface,
  Symbols,
} from 'recharts';
import Select from 'react-select';
import palette1 from 'components/data/palette.json';
import Bc3 from 'components/layout/bc3';

const Content1 = ({ ssg1, did1, marks, graphList, time_list2, cls1 }) => {
  function IndeterminateCheckbox({ indeterminate, className = '', ...rest }) {
    const ref = useRef();
    useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate;
      }
    }, [ref, indeterminate]);

    return <input type='checkbox' ref={ref} className={className + ' cursor-pointer'} {...rest} />;
  }
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className='px-1'>
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    ...ssg1.tab[ssg1.def.tmx].columns_en,
  ];
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [value, setValue] = useState(ssg1.def.tmx);
  const [data, setData] = useState(ssg1.tab[ssg1.def.tmx].data);
  const [ydata, setYdata] = useState(ssg1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [did_list1, setDid] = useState([]);
  const [dis_list1, setDnm] = useState([]);
  const [graph, setGraph] = useState(graphList[1]);

  useEffect(() => {
    setRowSelection({});
  }, [value]);
  useEffect(() => {
    json(`${server}/wo2/${did1}_int.json`).then((collection) => {
      setYdata(collection);
    });
    setIsLoaded(true);
    setRowSelection({
      0: true,
      1: true,
      2: true,
    });
  }, []);
  useEffect(() => {
    if (isLoaded & (ydata != null)) {
      setData(ydata.tab[value].data);
    }
  }, [ydata, value, isLoaded]);
  ///////////////
  function numberSort(rowA, rowB, id, desc) {
    let a = Number(rowA.values[id][0]);
    let b = Number(rowB.values[id][0]);

    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }
  function stringSort(rowA, rowB, id, desc) {
    let a = String(rowA.values[id][0]);
    let b = String(rowB.values[id][0]);

    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }
  //////////////
  // columns[1].sortType = stringSort;
  // columns[2].sortType = numberSort;
  // columns[3].sortType = numberSort;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const handleChange = (event, value) => {
    if (typeof value === 'number' && ydata.tab[value]) {
      setValue(value);
    }
  };

  console.log(data);
  console.log(columns);
  ///////////for charts suiig
  ///////////////////////////////////////////////////
  const check_length = Object.keys(rowSelection).length;
  useEffect(() => {
    if (ydata) {
      var did_list2 = [];
      var dis_list2 = [];
      Object.keys(rowSelection).forEach((v, i) => {
        if (i > 10) {
          return;
        }
        if (data[v] != undefined && cls1[data[v].iso] != undefined) {
          did_list2.push(data[v].iso);
          dis_list2.push(cls1[data[v].iso].ename);
        }
      });
      setDid(did_list2);
      setDnm(dis_list2);
    }
  }, [check_length, ydata]);
  useEffect(() => {
    if (Object.keys(ydata.tab).length > 1 && did_list1 != undefined) {
      var child1 = [];
      time_list2.forEach((v0, i0) => {
        var child2 = {};
        child2['year'] = v0;
        did_list1.forEach((v1, i1) => {
          var th_categories = ydata.tab[v0].data.find((s0) => s0.iso == did_list1[i1]);
          var th_categories_base = ydata.tab[time_list2[time_list2.length - 1]].data.find(
            (s0) => s0.iso == did_list1[i1],
          );

          if (th_categories && th_categories_base != undefined) {
            if (th_categories[graph.value] != '') {
              if (Array.isArray(th_categories[graph.value])) {
                child2[cls1[th_categories_base.iso].ename] = Number(th_categories[graph.value][0]);
              } else {
                child2[cls1[th_categories_base.iso].ename] = Number(th_categories[graph.value]);
              }
            }
          }
        });
        child1.push(child2);
      });

      setChartData(child1);
    }
  }, [did_list1, graph]);

  const rep1 = {
    world: 'world ranking',
  };
  rep1[did1] = ssg1.def.ide;
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
      <Map1
        did1={did1}
        ssg1={ydata}
        marks={marks}
        graphList={graphList}
        time_list2={time_list2}
        cls1={cls1}
        isLoaded={isLoaded}
      />
      {chartData != [] && (
        <Suiig
          ssg1={ssg1}
          graphList={graphList}
          graph={graph}
          setGraph={setGraph}
          dis_list1={dis_list1}
          did_list1={did_list1}
          chartData={chartData}
        />
      )}
      <Typography variant='h2' component='h2'>
        Ranked by country {value} | {ssg1.def.ide}
      </Typography>
      <Box padding='10px 50px' maxWidth='600px'>
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
          valueLabelDisplay='auto'
          value={value}
          aria-label='non-linear-slider'
          defaultValue={Number(ssg1.def.tmx)}
          min={Number(ssg1.def.tmn)}
          max={Number(ssg1.def.tmx)}
          step={null}
          marks={marks}
          onChange={handleChange}
        />
      </Box>
      <Box className={classes.retable}>
        <table className={[classes.table1, classes.world1].join(' ')}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' ▲',
                          desc: ' ▼',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, i1) => (
                  <td key={cell.id}>
                    {i1 == 0 && flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {i1 == 1 && flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {i1 == 2 && (
                      <>
                        {/* {cell.getValue() != 'XK' && (
                          <img src={'/img/wlogo/' + cell.getValue() } width={18}></img>
                        )} */}

                        <Link prefetch={false} href={'/world/country/' + cell.getValue()}>
                          {cls1[cell.getValue()] ? cls1[cell.getValue()].ename : ''}
                        </Link>
                      </>
                    )}
                    {i1 == 3 && (
                      <div className={classes.p1}>
                        <div className={classes.p2}>
                          {cell.getValue() ? Number(cell.getValue()[0]).toLocaleString() : ''}
                          {/* {ssg1.def.ute} */}
                        </div>
                        <div className={classes.p4}>
                          <div
                            className={classes.p3}
                            style={{
                              width: cell.getValue() ? cell.getValue()[1] + '%' : '0',
                              backgroundColor: cell.getValue() ? cls1[cell.getValue()[2]].lcr : '',
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {i1 == 4 && (
                      <span
                        className={
                          Number(cell.getValue()) > 0
                            ? classes.pl1
                            : Number(cell.getValue()) < 0
                            ? classes.mi1
                            : classes.ne1
                        }
                      >
                        {cell.getValue() != 0 ? `${Number(cell.getValue()).toFixed(2)}%` : ''}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Content1;

///////////////////////
// eslint-disable-next-line react/display-name
const Suiig = (props) => {
  ////////////
  const CustomTooltip2 = (prps2) => {
    const payload = prps2.payload;
    const label = prps2.label;

    if (prps2.active && payload && payload.length) {
      return (
        <>
          <div>
            <Box
              sx={{
                backgroundColor: 'white',
                opacity: '0.9',
                padding: '5px 10px 5px 10px',
              }}
            >
              <Typography style={{ fontSize: '14px', color: 'dimgrey' }}>
                {label} {props.ssg1.def.tle}
              </Typography>
              <table className={classes.tiptable} style={{ fontSize: '14px' }}>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>{props.graph.label}</th>
                  </tr>
                </thead>
                <tbody>
                  {payload.map((v, i) => {
                    return (
                      <Fragment key={'t' + i}>
                        <tr>
                          <td>
                            <Surface width={10} height={10}>
                              <Symbols
                                cx={5}
                                cy={5}
                                type='circle'
                                size={50}
                                fill={payload[i].color}
                              />
                            </Surface>
                            {payload[i].dataKey}
                          </td>
                          <td style={{ color: payload[i].color }}>
                            {payload[i].value.toLocaleString()}
                            {/* {props.graph.unit} */}
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          </div>
        </>
      );
    }

    return null;
  };
  /////////////
  return (
    <Box>
      <Typography variant='h2' component='h2'>
        Time-series trend {props.ssg1.def.tmn}〜{props.ssg1.def.tmx} | {props.ssg1.def.ide}
      </Typography>
      <Box sx={{ maxWidth: '400px' }} paddingBottom={2}>
        <Select
          defaultValue={props.graphList[1]}
          filterOption={false}
          options={props.graphList}
          onChange={(e) => {
            props.setGraph(e);
          }}
          isSearchable={false}
          id='selectbox3'
          instanceId='selectbox3'
        />
      </Box>
      <ResponsiveContainer height={400}>
        <LineChart
          width={600}
          height={400}
          data={props.chartData}
          margin={{
            top: 5,
            right: 5,
            left: -50,
            bottom: 5,
          }}
        >
          {props.dis_list1.map((v3, i3) => {
            return (
              <Line
                connectNulls
                type='monotone'
                dataKey={v3}
                stroke={palette1[i3 % 100]}
                dot={{ r: 0 }}
                key={'l' + i3}
              />
            );
          })}
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
            reversed={props.graph.rev}
          />
          <Tooltip content={CustomTooltip2} wrapperStyle={{ zIndex: 1000 }} />
          <Legend
            align='left'
            wrapperStyle={{ paddingLeft: '50px' }}
            formatter={(value, entry, index) => <span className='text-color-class'>{value}</span>}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
