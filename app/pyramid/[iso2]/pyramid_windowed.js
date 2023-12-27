'use client';

import React, { Component, useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import rsearch from 'components/css/rsearch.module.css';
import Select from 'react-windowed-select';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { createFilter, components } from 'react-windowed-select';
import pop_path from 'components/pop/pop_path.json';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Link from '@mui/material/Link';

var options0 = [];

pop_path.map((s) => {
  var child1 = {};
  child1['value'] = s.params.iso2;
  child1['label'] = s.params.name;

  options0.push(child1);
});

// var tptions2 = [];
// var tptions1 = [];

// jpop_path1.map((s, i) => {
//   var child1 = {};
//   child1['value'] = s.params.iso2;
//   child1['label'] = s.params.jpni;
//   tptions1.push(child1);
// });

// jpop_path2.map((s, i) => {
//   var child1 = {};
//   child1['value'] = s.params.iso2;
//   child1['label'] = s.params.kata;
//   child1['jpni'] = s.params.jpni;
//   tptions2.push(child1);
// });

var pop_sum0 = [];
var pop_sum1 = [];
pop_path.map((s) => {
  if (pop_sum0.indexOf(s.params.akas) === -1) {
    var child2 = {};
    child2['akas'] = s.params.akas;
    child2['data'] = [];
    pop_sum0.push(s.params.akas);
    pop_sum1.push(child2);
  }
  var child3 = {};
  child3['jpni'] = s.params.jpni;
  child3['iso2'] = s.params.iso2;
  pop_sum1[pop_sum0.indexOf(s.params.akas)].data.push(child3);
});
// var options1 = options0.sort(function (a, b) {
//   return a.label < b.label ? -1 : 1; //オブジェクトの昇順ソート
// })
var options1 = options0;

const CustomOption = ({ children, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return <components.Option {...newProps}>{children}</components.Option>;
};

CustomOption.propTypes = {
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const MyComponent = (props) => {
  const router = useRouter();
  //const [op1, setOp1] = useState(options1);
  //const [op3, setOp3] = useState([]);
  //const [value, setValue] = useState(props.res3.params.akas);

  const [value, setValue] = useState('ナ');
  const [valuep, setValuep] = useState('wo');
  //   const [op2, setOp2] = useState(tptions2);
  useEffect(() => {
    if (props.res3 != undefined) {
      if (props.res3.params.akas != undefined && props.res3.params.cl == 'wo') {
        setValue(props.res3.params.akas);
      }
      if (props.res3.params.cl != undefined) {
        setValuep(props.res3.params.cl);
      }
    }
  }, [props.res3]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangep = (event, newValue) => {
    setValuep(newValue);
  };
  return (
    <>
      <Box
        border='solid 1px lightgrey'
        p={1}
        borderRadius={2}
        sx={{ backgroundColor: '#f2f2f2' }}
        marginTop='10px'
      >
        <Typography variant='h1' component='h2'>
          Explore Population Pyramid
        </Typography>
        <Box
          sx={{
            width: '100%',
            typography: 'body1',
            '& .MuiTabPanel-root': {
              padding: '12px',
            },
          }}
        >
          <TabContext value={valuep}>
            {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangep} indicatorColor='secondary' textColor='inherit'>
                <Tab label='世界' value='wo' />
                <Tab label='都道府県' value='jp' />
                <Tab label='市区町村' value='sh' />
              </TabList>
            </Box> */}
            <TabPanel value='wo'>
              <Grid container rowspacing={1} columns={12} columnSpacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant='caption' paddingLeft='10px'>
                    select country/region
                  </Typography>
                  <Select
                    className={rsearch.select1}
                    //filterOption={false}
                    //filterOption={createFilter({ ignoreAccents: false })}
                    //components={{ MenuList }}
                    //components={{ Option: CustomOption }}
                    placeholder={'japan...'}
                    options={options1}
                    // isSearchable={false}
                    //   defaultValue={op1.filter((s) => s.value == props.did1)}
                    onChange={(e) => {
                      // var e1 = options3.filter((s) => e.nid == s.value);
                      //  setOp3(e1[0]);
                      router.push(`/pyramid/${e.value}`);
                    }}
                  />
                </Grid>
              </Grid>
              {/* <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label=''
                    textColor='secondary'
                    indicatorColor='secondary'
                    sx={{
                      '& .MuiTabs-flexContainer': {
                        display: 'block',
                        whiteSpace: 'normal',
                      },
                      '& .MuiTab-root': {
                        minWidth: 'auto',
                        minHeight: 'auto',
                      },
                    }}
                  >
                    {pop_sum1.map((s) => {
                      return <Tab label={s.akas} value={s.akas} key={s.akas} />;
                    })}
                  </TabList>
                </Box>
                {pop_sum1.map((s) => {
                  return (
                    <TabPanel value={s.akas} key={s.akas + '1'}>
                      <Grid container spacing={0.5} columns={12}>
                        {s.data.map((t, index) => {
                          return (
                            <Grid item xs={6} key={'a' + index}>
                              <Typography textAlign='center' display='inline'>
                                <Link
                                  href={'/pyramid/' + t.iso2}
                                  sx={{ color: 'black', textDecoration: 'underline' }}
                                >
                                  {t.jpni}
                                </Link>
                              </Typography>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </TabPanel>
                  );
                })}
              </TabContext> */}
            </TabPanel>
            {/* <TabPanel value='jp'>
              <Grid container rowspacing={1} columns={12} columnSpacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant='caption' paddingLeft='10px'>
                    都道府県を選ぶ
                  </Typography>
                  <Select
                    className={rsearch.select1}
                    placeholder={'大阪...'}
                    options={tptions1}

                    onChange={(e) => {

                      router.push(`/pyramid/${e.value}`);
                    }}
                  />
                </Grid>
              </Grid>
            </TabPanel> */}
            {/* <TabPanel value='sh'>
              <Grid container rowspacing={1} columns={12} columnSpacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant='caption' paddingLeft='10px'>
                    都道府県を選ぶ
                  </Typography>
                  <Select
                    className={rsearch.select1}
                    placeholder={'大阪...'}
                    options={tptions1}
                    onChange={(e) => {
                      if (e.label != '全国') {
                        setOp2(tptions2.filter((s) => e.label == s.jpni));
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='caption' paddingLeft='10px'>
                    市区町村を選ぶ
                  </Typography>
                  <Select
                    className={rsearch.select1}
                    placeholder={'大阪市　天王寺区...'}
                    options={op2}
                    onChange={(e) => {
                      router.push(`/pyramid/${e.value}`);
                    }}
                  />
                </Grid>
              </Grid>
            </TabPanel> */}
          </TabContext>
        </Box>
      </Box>
    </>
  );
};
export default MyComponent;
