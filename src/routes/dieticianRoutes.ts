import AddFood from '../pages/dietician/AddFood';
import AddMenu from '../pages/dietician/AddMenu';
import ClientDetail from '../pages/dietician/ClientDetail';
import DieticianHome from '../pages/dietician/Home';
export const dieticianRoutes = [
  {
    path: '/dietician',
    page: DieticianHome,
    allowedRole: 'dietician',
  },
  {
    path: '/dietician/client/:id',
    page: ClientDetail,
    allowedRole: 'dietician',
  },
  {
    path: '/dietician/add-menu',
    page: AddMenu,
    allowedRole: 'dietician',
  },
  {
    path: '/dietician/add-food',
    page: AddFood,
    allowedRole: 'dietician',
  },
];
