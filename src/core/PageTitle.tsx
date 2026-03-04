import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_TITLES: { path: string; title: string }[] = [
  { path: '/auth/login', title: 'Login' },
  { path: '/dashboard', title: 'Dashboard' },
  { path: '/users', title: 'Usuarios' },
  { path: '/users/new', title: 'Nuevo usuario' },
  { path: '/users/:id/edit', title: 'Editar usuario' },
];

function getTitleForPath(pathname: string): string {
  const exact = ROUTE_TITLES.find((r) => r.path === pathname);
  if (exact) return exact.title;
  const editMatch = pathname.match(/^\/users\/[^/]+\/edit$/);
  if (editMatch) return 'Editar usuario';
  return 'Esqueleto';
}

export function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const title = getTitleForPath(pathname);
    document.title = title ? `Demo - ${title}` : 'Demo';
  }, [pathname]);
  return null;
}
