'use client';

import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import Bc3 from 'components/layout/bc3';
import theme from 'theme';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useState, useEffect, useMemo, Fragment } from 'react';
import classes from 'components/css/ranking.module.css';
import Link from 'next/link';
import { json } from 'd3-fetch';
import { server } from 'components/data/config';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getColumnCanGlobalFilter,
} from '@tanstack/react-table';
const rep1 = {
  world: 'world ranking',
  country: 'country',
};

const fuzzyFilte2 = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId).join(' '), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = Array.isArray(row.getValue(columnId))
    ? rankItem(row.getValue(columnId).join(' '), value)
    : rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
const World_country = ({ res2, country, enm, options_topic }) => {
  // const categoryValue = '';
  const data = res2.data;
  console.log(data);
  // const cls1 = wor_path.country;
  // const enm = cls1[country].enm;
  // const [data, setData] = useState(res2.data);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [columnFilters, setColumnFilters] = useState([{ id: 'c', value: categoryValue }]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  // useEffect(() => {
  //   json(`${server}/rn3/${country}_en.json`).then((collection) => {
  //     setData(collection.data);
  //   });
  //   setIsLoaded(true);
  // }, []);
  function NumberSort2(rowA, rowB, columnId) {
    const numA = Number(rowA.getValue(columnId)[0]);
    const numB = Number(rowB.getValue(columnId)[0]);
    return numA < numB ? 1 : numA > numB ? -1 : 0;
  }

  const columns = res2.columns;

  columns[3].sortingFn = NumberSort2;
  columns[0].filterFn = 'arrIncludes';
  columns[0].enableGlobalFilter = true;

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: { pageSize: 100 },
    },
    filterFns: {
      fuzzy: fuzzyFilter,
      fuzz2: fuzzyFilte2,
    },
    sortingFns: { NumberSort2: NumberSort2 },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      // rowSelection,
    },
    // enableRowSelection: true,
    // onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    // globalFilterFn: 'arrIncludes',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // getColumnCanGlobalFilter: getColumnCanGlobalFilter(),
    getColumnCanGlobalFilter: (col) => {
      return col.columnDef.enableGlobalFilter ?? true;
    },
  });
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
        {enm}
        {"'"}s Statistical Data Ranking - summary
      </Typography>
      {/* <Button
        color='secondary'
        variant={country == 'Summary' ? 'contained' : 'outlined'}
        fontSize={{ xs: '13px', sm: '16px' }}
        //prefetch={false}
        href={'/world/country/' + country}
      >
        summary
      </Button>
      {wor_path.topic.map((v, i) => {
        return (
          <Fragment key={i + 'a'}>
            <Button
              color='secondary'
              variant={country[1] == v.ne1 ? 'contained' : 'outlined'}
              fontSize={{ xs: '13px', sm: '16px' }}
              // prefetch={false}
              href={'/world/country/' + country + '/' + v.ne1}
            >
              {v.ne1}
            </Button>
          </Fragment>
        );
      })} */}
      <Typography variant='body1'>
        This page summarizes {enm}
        {"'"}s statistical data rankings such as economy, area, population, etc.
      </Typography>

      <Typography variant='h2'>
        {enm}
        {"'"}s rankings for statistics - summary
      </Typography>
      <Box className={classes.retable}>
        <div>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder='Search all columns...'
          />
        </div>
        <table className={[classes.table1, classes.world_en, classes.world1].join(' ')}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, ih) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' ▲',
                            desc: ' ▼',
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                        {ih == 0 && header.column.getCanFilter() ? (
                          <div>
                            <SimpleFilte2
                              column={header.column}
                              table={table}
                              options_topic={options_topic}
                            />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, i1) => (
                    <td key={cell.id}>
                      {/* {i1 == 0 && wor_path.topic.find((s) => s.id1 == cell.getValue()).ne1} */}
                      {i1 == 0 && (
                        <>
                          <AnalyticsRoundedIcon sx={{ verticalAlign: 'bottom' }} />
                          {cell.getValue()}
                        </>
                      )}
                      {i1 == 1 && Number(cell.getValue()).toLocaleString()}
                      {i1 == 3 && cell.getValue()}
                      {i1 == 2 && (
                        <Link prefetch={false} href={'/world/category/' + cell.getValue()[1]}>
                          #{cell.getValue()[0]}
                        </Link>
                      )}
                      {/* {i1 == 3 &&                      <>
                        { cls1[cell.getValue()] && (
                          <img
                            src={`/img/wlogo/${cls1[cell.getValue()].log}.png`}
                            width={18}
                            alt={cell.getValue()}
                          ></img>
                        )}

                        <Link prefetch={false} href={'/world/country/' + cell.getValue()}>
                          {cls1[cell.getValue()] ? cls1[cell.getValue()].enm : ''}
                        </Link>
                      </> } */}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Grid container spacing={0.5} columns={{ xs: 12, sm: 12 }} className={classes.pagination}>
          <Grid item xs={6} sm={3}>
            <button
              // color='secondary'
              // variant='outlined'
              style={{ marginRight: '5px' }}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              style={{ marginRight: '5px' }}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              style={{ marginRight: '5px' }}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              style={{ marginRight: '5px' }}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <span style={{ marginRight: '5px' }}>
              <span style={{ marginRight: '5px' }}>Page</span>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
          </Grid>
          <Grid item xs={6} sm={3}>
            <span style={{ marginRight: '5px' }}>
              Go to:{' '}
              <input
                style={{ width: '60px' }}
                type='number'
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
              />
            </span>
          </Grid>
          <Grid item xs={6} sm={3}>
            <select
              style={{ marginRight: '5px' }}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[100, 500, 1000].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default World_country;

function SimpleFilte2({ column, table, options_topic }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = options_topic;

  return (
    <>
      <select
        value={columnFilterValue ?? ''}
        onChange={(e) => {
          column.setFilterValue(e.target.value || undefined);
        }}
      >
        <option value=''>All</option>
        {sortedUniqueValues.map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          );
        })}
      </select>
    </>
  );
}

function Filter({ column, table }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

  return typeof firstValue === 'number' ? (
    <div>
      <div className='flex space-x-2'>
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={columnFilterValue?.[0] ?? ''}
          onChange={(value) => column.setFilterValue((old) => [value, old?.[1]])}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
          }`}
          className='w-24 border shadow rounded'
        />
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={columnFilterValue?.[1] ?? ''}
          onChange={(value) => column.setFilterValue((old) => [old?.[0], value])}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
          }`}
          className='w-24 border shadow rounded'
        />
      </div>
      <div className='h-1' />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {/* {sortedUniqueValues.slice(0, 5000).map((value) => ( */}
        {sortedUniqueValues.map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type='text'
        value={columnFilterValue ?? ''}
        onChange={(value) => column.setFilterValue(value)}
        // placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        placeholder={'Search'}
        // className='w-36 border shadow rounded'
        list={column.id + 'list'}
        style={{ width: '100px' }}
      />
      <div className='h-1' />
    </>
  );
}

// A debounced input react component
function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}
