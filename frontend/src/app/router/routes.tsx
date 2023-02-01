// TODO: оптимизировать списки рутов, когда будут готовы отдельные страницы, чтобы добавлять через map

// import MainPage from '../../pages/main/MainPage';

// interface IRoute {
//   path: string;
//   component: React.FC;
//   exact: boolean;
// }
// const routes: IRoute[] = [
//   {path: '/', component: MainPage, exact: true}
// ]

const privateRoutes = ['/dashboard', '/transactions', '/settings'];
const publicRoutes = ['/', '/login', '/sign'];

export { privateRoutes, publicRoutes };
