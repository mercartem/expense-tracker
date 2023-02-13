import { useEffect, useState, useContext } from 'react';
import Header from '../widgets/Header/ui/Header';
import Navbar from '../widgets/Navbar/ui/Navbar';
import BalanceContext from '../app/context/BalanceContext';


function View() {
  const {balance} = useContext(BalanceContext);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width > 770 ? <Navbar balance={balance} /> : <Header balance={balance} />
}

export default View;
