import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { LinkTabProps } from '../lib/types';

function LinkTab(props: LinkTabProps) {
  const { href } = props;
  return <Tab component={Link} to={href} {...props} />;
}

export default LinkTab;
