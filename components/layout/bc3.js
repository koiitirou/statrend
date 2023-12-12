import { Breadcrumbs, Link, Typography } from '@mui/material/';
import { usePathname } from 'next/navigation';

const Bc3 = ({ rep1 }) => {
  const path0 = usePathname();
  const path1 = path0
    .split('?')[0]
    .split('#')[0]
    .split('/')
    .filter((v) => v.length > 0);
  const path2 = [{ text1: 'Top', text2: 'Top', href: '/' }];
  path1.forEach((v, i) => {
    var ch1 = {};
    ch1['text1'] = v;
    ch1['text2'] = rep1 ? (rep1[v] ? rep1[v] : v) : v;
    ch1['href'] = '/' + path1.slice(0, i + 1).join('/');
    path2.push(ch1);
  });
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {path2.map((v, i) => {
        const isLastItem = i === path2.length - 1;

        if (isLastItem) {
          return <Typography key={'b' + i}>{v.text2}</Typography>;
        }
        return (
          <Link underline='hover' color='inherit' href={v.href} key={'b' + i}>
            {v.text2}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Bc3;
