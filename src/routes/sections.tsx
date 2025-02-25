import { lazy } from 'react';
import { Navigate, useRoutes, Outlet } from 'react-router-dom';
import AuthGuard from '../auth/guard/auth-guard';
import GuestGuard from '../auth/guard/guest-guard';
import DashboardLayout from '../layouts/dashboard';
import AuthLayout from '../layouts/auth';
import { paths } from './paths';

// Lazy load pages
const IndexPage = lazy(() => import('../pages/app'));
const UserPage = lazy(() => import('../pages/user'));
const LoginPage = lazy(() => import('../pages/login'));
const RegisterPage = lazy(() => import('../pages/register'));
const Page404 = lazy(() => import('../pages/page-not-found'));

// Admin Pages
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard'));
const AdminUsersPage = lazy(() => import('../pages/admin/users'));
const AdminSettingsPage = lazy(() => import('../pages/admin/settings'));

// Doctor Pages
const DoctorDashboardPage = lazy(() => import('../pages/doctor/dashboard'));
const DoctorAppointmentsPage = lazy(() => import('../pages/doctor/appointments'));
const DoctorPatientsPage = lazy(() => import('../pages/doctor/patients'));

export default function Router() {
  return useRoutes([
    {
      path: paths.auth.login,
      element: (
        <GuestGuard>
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        </GuestGuard>
      ),
    },
    {
      path: paths.auth.register,
      element: (
        <GuestGuard>
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        </GuestGuard>
      ),
    },
    {
      path: paths.admin.root,
      element: (
        <AuthGuard>
          <DashboardLayout>
            <Outlet />
</DashboardLayout>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={paths.admin.dashboard} replace />, index: true },
        { path: paths.admin.dashboard, element: <AdminDashboardPage /> },
        { path: paths.admin.users, element: <AdminUsersPage /> },
        { path: paths.admin.settings, element: <AdminSettingsPage /> },
      ],
    },
    {
      path: paths.doctor.root,
      element: (
        <AuthGuard>
               <DashboardLayout>
            <Outlet />
</DashboardLayout>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={paths.doctor.dashboard} replace />, index: true },
        { path: paths.doctor.dashboard, element: <DoctorDashboardPage /> },
        { path: paths.doctor.appointments, element: <DoctorAppointmentsPage /> },
        { path: paths.doctor.patients, element: <DoctorPatientsPage /> },
      ],
    },
    {
      path: paths.app.root,
      element: (
        <AuthGuard>
             <DashboardLayout>
            <Outlet />
</DashboardLayout>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={paths.app.user} replace />, index: true },
        { path: paths.app.user, element: <UserPage /> },
      ],
    },
    {
      path: '/',
      element: <IndexPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);
}
