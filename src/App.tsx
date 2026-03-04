import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './core/auth/AuthContext';
import { ProtectedRoute } from './core/auth/ProtectedRoute';
import { PageTitle } from './core/PageTitle';
import { AuthLayout } from './layouts/AuthLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UsersList } from './pages/UsersList';
import { UserForm } from './pages/UserForm';

export default function App() {
  return (
    <BrowserRouter>
      <PageTitle />
      <AuthProvider>
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route index element={<Navigate to="login" replace />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/new" element={<UserForm />} />
            <Route path="users/:id/edit" element={<UserForm />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
