import { Outlet } from 'react-router-dom';
import './AuthLayout.scss';

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <main>
        <section>
          <header>
            <img src="/logo-light.svg" alt="Esqueleto" />
            <p>Inicia sesión para continuar</p>
          </header>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
