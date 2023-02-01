import { useLocation } from 'react-router-dom';

function matchCurrentUrl(pathToMatch: string){
  const currentPath = useLocation();
  return (currentPath.pathname === pathToMatch) 
}

export default matchCurrentUrl