'use client';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import Bc3 from 'components/layout/bc3';
import { Box, Typography, Grid, Button, Item } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import classes from 'components/css/ranking.module.css';
import wor1 from 'components/wor/world_ranking_en.json';
import { rankItem, compareItems } from '@tanstack/match-sorter-utils';
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
} from '@tanstack/react-table';

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId).join(' '), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const World_rank = ({ wor_path }) => {
  //GB_XPD_RSDV_GD_ZS
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const cls1 = wor_path.country;
  const rep1 = {
    world: 'world ranking',
  };
  const columns = wor1.columns;
  columns[0].filterFn = 'fuzzy';
  const data = wor1.data;

  var options_topic = [];
  wor_path.topic.forEach((v) => {
    options_topic.push(v.ne1);
  });

  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize: 100 } },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
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
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });
  return (
    <Box
      sx={{
        p: 1,
        maxWidth: '1300px',
        width: 'auto',
        margin: 'auto',
        // [theme.breakpoints.up('md')]: { maxWidth: '67%' },
      }}
    >
      <Bc3 rep1={rep1} />
      <Typography variant='h1'>World rankings for statistics by countries</Typography>
      <Box className={classes.retable}>
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
                        {
                          // ih == 0 && header.column.getCanFilter() ? (
                          //   <div>
                          //     <SimpleFilter column={header.column} table={table} />
                          //   </div>
                          // ) :
                          // ih == 1 && header.column.getCanFilter() ? (
                          //   <div>
                          //     <Filter column={header.column} table={table} />
                          //   </div>
                          // ) :
                          ih == 0 && header.column.getCanFilter() ? (
                            <div>
                              <SimpleFilte2
                                column={header.column}
                                table={table}
                                options_topic={options_topic}
                              />
                            </div>
                          ) : null
                        }
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              // console.log(rankItem(row.getValue('t').join(' '), 'agri'));
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, i1) => (
                    <td key={cell.id}>
                      {/* {i1 == 0 && wor_path.topic.find((s) => s.id1 == cell.getValue()).ne1} */}
                      {/* {i1 == 0 && cell.getValue()} */}
                      {i1 == 0 && (
                        <>
                          <AnalyticsRoundedIcon sx={{ verticalAlign: 'bottom' }} />
                          <Link prefetch={false} href={'/world/category/' + cell.getValue()[1]}>
                            {cell.getValue()[0]}
                          </Link>
                        </>
                      )}
                      {(i1 == 2 || i1 == 3 || i1 == 4 || i1 == 1) && (
                        <>
                          {cls1[cell.getValue()[1]] && (
                            <img
                              src={`/img/wlogo/${cls1[cell.getValue()[1]].log}.png`}
                              width={18}
                              alt={cell.getValue()}
                            ></img>
                          )}

                          <Link prefetch={false} href={'/world/country/' + cell.getValue()[1]}>
                            {cell.getValue()[0]}
                          </Link>
                          <Box className={classes.cnt_value}>{cell.getValue()[2]}</Box>
                        </>
                      )}

                      {i1 == 5 && cell.getValue()}
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

function SimpleFilter({ column, table }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

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

export default World_rank;
