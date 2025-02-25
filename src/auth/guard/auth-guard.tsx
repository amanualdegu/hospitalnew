import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { useAuth } from '../context/auth';

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={paths.auth.login} />;
  }

  return <>{children}</>;
}
