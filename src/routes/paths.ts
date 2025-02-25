function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS = {
  app: '/app',
  auth: '/auth',
  admin: '/admin',
  doctor: '/doctor',
};

export const paths = {
  // Auth
  auth: {
    login: '/login',
    register: '/register',
  },
  // App
  app: {
    root: ROOTS.app,
    user: path(ROOTS.app, '/user'),
  },
  // Admin
  admin: {
    root: ROOTS.admin,
    dashboard: path(ROOTS.admin, '/dashboard'),
    users: path(ROOTS.admin, '/users'),
    settings: path(ROOTS.admin, '/settings'),
  },
  // Doctor
  doctor: {
    root: ROOTS.doctor,
    dashboard: path(ROOTS.doctor, '/dashboard'),
    appointments: path(ROOTS.doctor, '/appointments'),
    patients: path(ROOTS.doctor, '/patients'),
  },
};
