import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/usersService';
import type { User } from '../types/user';
import './UsersList.scss';

function shortId(id: string) {
  return id.slice(0, 8);
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>(() => getUsers());

  const handleDelete = (user: User) => {
    if (!window.confirm(`¿Eliminar a ${user.name}?`)) return;
    deleteUser(user.id);
    setUsers(getUsers());
  };

  return (
    <div className="users-list">
      <section>
        <header>
          <h2>Usuarios</h2>
          <Link to="/users/new">
            <iconify-icon icon="mdi:account-plus" />
            Nuevo usuario
          </Link>
        </header>

        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td><code>{shortId(user.id)}</code></td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/users/${user.id}/edit`} title="Editar">
                      <iconify-icon icon="mdi:pencil" />
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(user)}
                      title="Eliminar"
                    >
                      <iconify-icon icon="mdi:delete" />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <p>No hay usuarios para mostrar.</p>
            <Link to="/users/new">
              <iconify-icon icon="mdi:account-plus" />
              Nuevo usuario
            </Link>
          </>
        )}
      </section>
    </div>
  );
}
