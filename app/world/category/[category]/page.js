import { server } from 'components/data/config';
import ResBar from 'components/layout/resbar';
import Content1 from './world_category';
import wor_url1 from 'components/wor/wor_url1.json';
import cls1 from 'components/wor/location_df10.json';
// const array4 = [{ category: 'AG_LND_FRST_K2' }, { category: 'pop' }];

const array4 = [];
wor_url1.forEach((v, i) => {
  v.itm.forEach((v1, i1) => {
    var child1 = {};
    child1['category'] = v1.url;
    child1['em1'] = v1.em1;
    child1['tmn'] = v1.tmn;
    child1['tmx'] = v1.tmx;
    array4.push(child1);
  });
});

// export const metadata = {
//   title:
//     'Countries ranked by Annual freshwater withdrawals, total (% of internal resources) in the world',
//   description:
//     'List of countries and dependencies in the world ranked by life expectancy at birth, both sexes, males and females. World Population Life Expectancy with historical chart.',
// };

export async function generateStaticParams() {
  return array4;
}

export async function generateMetadata({ params }) {
  // read route params
  const { category } = params;
  const arr5 = array4.find((f) => f.category == category);

  return {
    title: `${arr5.em1} ${arr5.tmn}-${arr5.tmx} ranked by countries in the world`,
    // description: `List of countries in the world ranked by ${arr5.em1} with time-series graphs, charts, and interactive maps for ${arr5.tmn}-${arr5.tmx}.`,
    description: `Time-series interactive graphs, charts, and maps for ${arr5.tmn}-${arr5.tmx} explore the list of countries ranked by ${arr5.em1}.`,
  };
}

export default async function Page({ params }) {
  const { category } = params;
  const res = await fetch(`${server}/wo2/${category}_ssg.json`);
  const ssg1 = await res.json();
  const did1 = category;
  const rep1 = {
    world: 'country rankings',
  };
  rep1[ssg1.def.did] = ssg1.def.dis;

  /////////////////
  const marks = [];
  for (let i = 0; i < ssg1.def.tml.length; i++) {
    var thisYear = {};
    thisYear['value'] = ssg1.def.tml[i];
    marks.push(thisYear);
  }
  //////////////
  //////////////
  const graphList = [
    { value: 'r', label: 'Rank', unit: '', rev: true },
    { value: 'v', label: `${ssg1.def.tle}`, unit: `${ssg1.def.ute}`, rev: false },
    { value: 'd', label: 'Change', unit: '%', rev: false },
  ];
  const time_list2 = ssg1.def.tml;

  return (
    <>
      <ResBar />
      <Content1
        did1={did1}
        ssg1={ssg1}
        marks={marks}
        graphList={graphList}
        time_list2={time_list2}
        cls1={cls1}
      />
    </>
  );
}
