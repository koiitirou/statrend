'use-client';

import { components, createFilter } from 'react-windowed-select';
import React, { useState, useEffect, memo } from 'react';
import WindowedSelect from 'react-windowed-select';

import { useRouter, useSearchParams } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Box, Grid } from '@mui/material';
import rsearch from 'components/css/rsearch.module.css';
import Link from 'next/link';
import wor_path from 'components/wor/wor_path.json';

var options = [];

wor_path.path.map((s, i) => {
  var child1 = {};
  child1['value'] = s.params.category;
  child1['label'] = s.params.em1;
  child1['c'] = s.params.oid[0];
  child1['l'] = 'category';
  options.push(child1);
});

var option2 = [];
Object.keys(wor_path.country).map((s0, i) => {
  var s = wor_path.country[s0];
  var child1 = {};
  child1['value'] = s.is2;
  child1['label'] = s.enm;
  option2.push(child1);
});

const customFilter = createFilter({ ignoreAccents: false });
const customComponents = {
  ClearIndicator: (props) => (
    <components.ClearIndicator {...props}>clear</components.ClearIndicator>
  ),
};

const App = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [input, setInput] = useState('');
  const [inputSave, setSave] = useState('');
  const [query0, setQuery0] = useState();

  useEffect(() => {
    setSave(searchParams.get('i'));
    setQuery0(searchParams.get('i'));
  }, [searchParams.get('i')]);

  const [inpu2, setInpu2] = useState('');
  const [inputSav2, setSav2] = useState('');
  const [query2, setQuery2] = useState();

  useEffect(() => {
    setSav2(searchParams.get('i2'));
    setQuery2(searchParams.get('i2'));
  }, [searchParams.get('i2')]);

  return (
    <>
      <Box
        border='solid 1px lightgrey'
        p={1}
        borderRadius={2}
        sx={{ backgroundColor: '#f2f2f2' }}
        marginTop='10px'
        marginBottom='15px'
      >
        <Typography variant='h1' component='h2'>
          Explore wolrd data rankings
        </Typography>
        <Grid container rowspacing={1} columns={12} columnSpacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant='caption' paddingLeft='10px'>
              Search statistics
            </Typography>
            <Grid container rowspacing={1} columns={12} columnSpacing={1}>
              <Grid item xs={10}>
                <WindowedSelect
                  className={rsearch.select1}
                  placeholder={
                    inputSave ? (
                      <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{inputSave}</span>
                    ) : (
                      'total population...'
                    )
                  }
                  value={inputSave}
                  //   inputValue={input}
                  onInputChange={setInput}
                  onChange={(e) => {
                    window.location.assign(`/world/category/${e.value}`);
                  }}
                  onMenuClose={() => setSave(input)}
                  onFocus={() => {
                    setInput(inputSave);
                    setSave('');
                  }}
                  blurInputOnSelect
                  components={customComponents}
                  filterOption={customFilter}
                  options={options}
                  id='selectbox'
                  instanceId='selectbox'
                />
              </Grid>
              <Grid item xs={2}>
                <SearchIcon
                  sx={{
                    borderRadius: '4px',
                    padding: '3px',
                    fontSize: '34px',
                    height: '38px',
                    width: '38px',
                    background: '#2196f3',
                    color: '#fff',
                    verticalAlign: 'text-bottom',
                  }}
                  onClick={() => {
                    setQuery0(inputSave);
                    router.push(
                      {
                        pathname: router.pathname,

                        query: { i: inputSave, i2: inputSav2 },
                      },
                      undefined,
                      { shallow: true },
                    );
                  }}
                ></SearchIcon>
              </Grid>
            </Grid>
            <Result1 query0={query0} options={options} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='caption' paddingLeft='10px'>
              Search countries
            </Typography>
            <Grid container rowspacing={1} columns={12} columnSpacing={1}>
              <Grid item xs={10}>
                <WindowedSelect
                  className={rsearch.select1}
                  placeholder={
                    inputSav2 ? (
                      <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{inputSav2}</span>
                    ) : (
                      'Japan...'
                    )
                  }
                  value={inputSav2}
                  //   inputValue={inpu2}
                  onInputChange={setInpu2}
                  onChange={(e) => {
                    window.location.assign(`/world/country/${e.value}`);
                  }}
                  onMenuClose={() => setSav2(inpu2)}
                  onFocus={() => {
                    setInpu2(inputSav2);
                    setSav2('');
                  }}
                  blurInputOnSelect
                  components={customComponents}
                  filterOption={customFilter}
                  options={option2}
                  id='selectbo2'
                  instanceId='selectbo2'
                />
              </Grid>
              <Grid item xs={2}>
                <SearchIcon
                  sx={{
                    borderRadius: '4px',
                    padding: '3px',
                    fontSize: '34px',
                    height: '38px',
                    width: '38px',
                    background: '#2196f3',
                    color: '#fff',
                    verticalAlign: 'text-bottom',
                  }}
                  onClick={() => {
                    setQuery2(inputSav2);

                    router.push(
                      {
                        pathname: router.pathname,

                        query: { i: inputSave, i2: inputSav2 },
                      },
                      undefined,
                      { shallow: true },
                    );
                  }}
                ></SearchIcon>
              </Grid>
            </Grid>
            <Result2 query2={query2} option2={option2} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default App;

const Result1 = memo(function Foo(props) {
  const query0 = props.query0;
  const options = props.options;
  const [res0, setRes0] = useState(options);

  useEffect(() => {
    setRes0(options.filter((s) => s.label.includes(query0)));
  }, [query0]);
  //   return 'aa';

  const Highlighted = ({ text = '', highlight = '' }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts
          .filter((part) => part)
          .map((part, i) =>
            regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>,
          )}
      </span>
    );
  };
  return (
    <>
      {query0 && (
        <Box>
          <Typography>
            <mark>{res0.length} items</mark> found
          </Typography>
          {res0.map((s, i1) => (
            <React.Fragment key={'s' + i1}>
              <Typography variant='body2' paddingTop={0.5}>
                ・
                <Link prefetch={false} href={`/world/${s.value}`}>
                  <Highlighted text={s.label} highlight={query0} />
                </Link>
              </Typography>
            </React.Fragment>
          ))}
        </Box>
      )}
    </>
  );
});

const Result2 = memo(function Foo(props) {
  const query0 = props.query2;
  const option2 = props.option2;
  const [res0, setRes0] = useState(option2);

  useEffect(() => {
    setRes0(option2.filter((s) => s.label.includes(query0)));
  }, [query0]);
  //   return 'aa';

  const Highlighted = ({ text = '', highlight = '' }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts
          .filter((part) => part)
          .map((part, i) =>
            regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>,
          )}
      </span>
    );
  };
  return (
    <>
      {query0 && (
        <Box>
          <Typography>
            <mark>{res0.length} items</mark> found
          </Typography>
          {res0.map((s, i1) => (
            <React.Fragment key={'s' + i1}>
              <Typography variant='body2' paddingTop={0.5}>
                ・
                <Link prefetch={false} href={`/country/${s.value}`}>
                  <Highlighted text={s.label} highlight={query0} />
                </Link>
              </Typography>
            </React.Fragment>
          ))}
        </Box>
      )}
    </>
  );
});
