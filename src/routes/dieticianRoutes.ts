import ClientDetail from '../pages/dietician/ClientDetail';
import DieticianHome from '../pages/dietician/Home';
export const dieticianRoutes = [
  {
    path: '/dietician',
    page: DieticianHome,
    allowedRole: 'diyetisyen',
  },
  {
    path: '/dietician/client/:id',
    page: ClientDetail,
    allowedRole: 'diyetisyen',
  },
];
