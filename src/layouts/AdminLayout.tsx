import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../core/auth/AuthContext';
import './AdminLayout.scss';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'mdi:view-dashboard-outline', exact: true },
  { path: '/users', label: 'Usuarios', icon: 'mdi:account-group-outline', exact: false },
];

export function AdminLayout() {
  const { session, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHover, setSidebarHover] = useState(false);
  const sidebarLooksCollapsed = sidebarCollapsed && !sidebarHover;

  return (
    <div
      className="admin-layout"
      data-collapsed={sidebarLooksCollapsed ? true : undefined}
    >
      <aside
        onMouseEnter={() => setSidebarHover(true)}
        onMouseLeave={() => setSidebarHover(false)}
      >
        <div>
          {!sidebarLooksCollapsed && (
            <img src="/logo.svg" alt="Logo" />
          )}
          <button
            type="button"
            aria-label={sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            title={sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            onClick={() => setSidebarCollapsed((c) => !c)}
          >
            <iconify-icon icon={sidebarCollapsed ? 'mdi:menu-open' : 'mdi:menu'} />
          </button>
        </div>

        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              title={sidebarLooksCollapsed ? item.label : undefined}
            >
              <iconify-icon icon={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          title={sidebarLooksCollapsed ? 'Cerrar sesión' : undefined}
          onClick={() => logout()}
        >
          <iconify-icon icon="mdi:logout" />
          <span>Cerrar sesión</span>
        </button>
      </aside>

      <main>
        <header>
          {session && <span>{session.user.email}</span>}
        </header>
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
