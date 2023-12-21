import { server } from 'components/data/config';
import ResBar from 'components/layout/resbar';
// import wor_url1 from 'components/wor/wor_url1.json';
// import cls1 from 'components/wor/location_df10.json';
// import wor_cnt from 'components/wor/wor_cnt.json';
import wor_category1 from 'components/wor/wor_category1.json';
import World_country from './world_country';
import wor_path from 'components/wor/wor_path.json';
// const array4 = [{ category: 'AG_LND_FRST_K2' }, { category: 'pop' }];

const array6 = [];
wor_path.topic.forEach((s) => {
  Object.keys(wor_path.country).forEach((t, i) => {
    if (i == 0) {
      array6.push({ country: [t, ''] });
    }
    array6.push({ country: [t, s.ne1] });
  });
});

// const array4 = [];
// wor_url1.forEach((v, i) => {
//   v.itm.forEach((v1, i1) => {
//     var child1 = {};
//     child1['category'] = v1.url;
//     child1['em1'] = v1.em1;
//     child1['tmn'] = v1.tmn;
//     child1['tmx'] = v1.tmx;
//     array4.push(child1);
//   });
// });
// export const metadata = {
//   title:
//     'Countries ranked by Annual freshwater withdrawals, total (% of internal resources) in the world',
//   description:
//     'List of countries and dependencies in the world ranked by life expectancy at birth, both sexes, males and females. World Population Life Expectancy with historical chart.',
// };

export async function generateStaticParams() {
  return array6;
}

export async function generateMetadata({ params }) {
  // read route params
  const { country } = params;
  //   const arr5 = array4.find((f) => f.category == category);
  // const cn1 = wor_cnt.find((s) => s.is2 == country[0]);
  const cn1 = wor_path.country[country[0]];

  return {
    title: `${cn1.enm} data rankings - ${country[1] == undefined ? 'summary' : country[1]}`,
    // description: `List of countries in the world ranked by ${arr5.em1} with time-series graphs, charts, and interactive maps for ${arr5.tmn}-${arr5.tmx}.`,
    description: `This page summarizes ${cn1.enm} statistical data rankings (${
      country[1] == undefined ? 'summary' : country[1]
    }).`,
  };
}

export default async function Page({ params }) {
  const { country } = params;
  // const res1 = await fetch(`${server}/rn2/${country[0]}_${country[1]}.json`);
  // const res1 = await fetch(`${server}/rn3/${country[0]}_en.json`);
  const res1 = await fetch(`${server}/rn3_100/${country[0]}_en.json`);
  const res2 = await res1.json();
  if (country[1] == undefined) {
    country[1] = 'Summary';
  }
  //   const res = await fetch(`${server}/wo2/${category}_ssg.json`);
  //   const ssg1 = await res.json();
  //   const did1 = category;
  const rep1 = {
    world: 'country ranking',
  };
  //   rep1[ssg1.def.did] = ssg1.def.dis;

  //   /////////////////
  //   const marks = [];
  //   for (let i = 0; i < ssg1.def.tml.length; i++) {
  //     var thisYear = {};
  //     thisYear['value'] = ssg1.def.tml[i];
  //     marks.push(thisYear);
  //   }
  //   //////////////
  //   //////////////
  //   const graphList = [
  //     { value: 'r', label: 'Rank', unit: '', rev: true },
  //     { value: 'v', label: `${ssg1.def.tle}`, unit: `${ssg1.def.ute}`, rev: false },
  //     { value: 'd', label: 'Change', unit: '%', rev: false },
  //   ];
  //   const time_list2 = ssg1.def.tml;

  return (
    <>
      <ResBar />
      <World_country
        res2={res2}
        // wor_cnt={wor_cnt}
        country={country}
        wor_category1={wor_category1}
        array6={array6}
        wor_path={wor_path}
      />
      {/* <Content1
        did1={did1}
        ssg1={ssg1}
        marks={marks}
        graphList={graphList}
        time_list2={time_list2}
        cls1={cls1}
      /> */}
    </>
  );
}
