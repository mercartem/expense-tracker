import { useEffect, useState } from 'react';
import Header from '../widgets/Header/ui/Header';
import Navbar from '../widgets/Navbar/ui/Navbar';

function View() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width > 770 ? <Navbar /> : <Header />;
}

export default View;
