import ClientHome from '../pages/client/Home';

export const clientRoutes = [
  {
    path: '/client',
    page: ClientHome,
    allowedRole: 'danışan',
  },
];
