import React from 'react';
import { clientRoutes } from './clientRoutes';
import { dieticianRoutes } from './dieticianRoutes';
import { landingRoutes } from './landingRoutes';
import { logInRoutes } from './logInRoutes';
import { registerRoutes } from './registerRoutes';

interface RouteType {
  path: string;
  page: () => React.ReactElement;
  allowedRole?: string;
}

const routes: RouteType[] = [
  ...registerRoutes,
  ...dieticianRoutes,
  ...clientRoutes,
  ...landingRoutes,
  ...logInRoutes,
];

export default routes;
