import Tab from '@mui/material/Tab';
import { LinkTabProps } from '../lib/types';

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component='a'
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default LinkTab;
