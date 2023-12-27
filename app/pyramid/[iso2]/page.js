import ResBar from 'components/layout/resbar';
import Pyramid2 from './pyramid2';
import { server } from 'components/data/config';
import pop_path from 'components/pop/pop_path.json';

const array4 = [];
pop_path.forEach((v, i) => {
  array4.push(v.params);
});

export async function generateStaticParams() {
  return array4;
}

export async function generateMetadata({ params }) {
  // read route params
  const { iso2 } = params;
  const res3 = pop_path.find((v) => v.params.iso2 == iso2);
  return {
    title: `${res3.params.name} Population Pyramid 1950-2010`,
    description: `${res3.params.name} population pyramid (5 -year age group), total population trends, and segmented population trends (young, working-age, and elderly) from 1950 to 2010.`,
  };
}

export default async function Page({ params }) {
  const { iso2 } = params;
  const res1 = await fetch(`${server}/yr5out/${iso2}.json`);
  const res2 = await res1.json();
  const rep1 = {
    pyramid: 'population pyramid',
  };
  const res3 = pop_path.find((v) => v.params.iso2 == iso2);

  return (
    <>
      <ResBar />
      <Pyramid2 res2={res2} iso2={iso2} res3={res3} />
    </>
  );
}
