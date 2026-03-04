# Esqueleto — React

Backoffice base según [ESQUELETO_PROMPT.md](../ESQUELETO_PROMPT.md): auth, dashboard, CRUD usuarios, datos en localStorage, SCSS, Iconify.

## Stack

- **React 19** + **Vite** + TypeScript
- **react-router-dom** (rutas anidadas, protección)
- **sass** (SCSS)
- **iconify-icon** (web component)

## Comandos

```bash
npm install
npm run dev    # http://localhost:5173
npm run build
npm run preview
```

## Estructura

- `src/core/auth` — AuthContext, ProtectedRoute, sessionStorage
- `src/layouts` — AuthLayout, AdminLayout
- `src/pages` — Login, Dashboard, UsersList, UserForm
- `src/services` — usersService (localStorage)
- `src/styles/util` — variables, base, mixins SCSS

## Credenciales (login simulado)

Cualquier email y contraseña; la sesión se persiste en `localStorage` (`auth_session`). Usuarios en `esqueleto_users`.
