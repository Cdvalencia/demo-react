import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, createUser, updateUser } from '../services/usersService';
import { ROLES } from '../types/user';
import './UserForm.scss';

export function UserForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<string>(ROLES[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      const user = getUserById(id);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setRole(user.role);
      } else {
        navigate('/users', { replace: true });
      }
    }
  }, [id, isEdit, navigate]);

  function cancel() {
    navigate('/users');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('El nombre es obligatorio.');
      return;
    }
    if (!email.trim()) {
      setError('El correo es obligatorio.');
      return;
    }

    if (isEdit && id) {
      updateUser({ id, name: name.trim(), email: email.trim(), phone: phone.trim(), role });
    } else {
      createUser({ name: name.trim(), email: email.trim(), phone: phone.trim(), role });
    }
    navigate('/users');
  }

  const pageTitle = isEdit ? 'Editar usuario' : 'Nuevo usuario';

  return (
    <div className="user-form">
      <section>
        <header>
          <button type="button" onClick={cancel}>
            <iconify-icon icon="mdi:arrow-left" />
            Volver
          </button>
          <h2>{pageTitle}</h2>
        </header>

        <form onSubmit={handleSubmit}>
          {error && <div>{error}</div>}

          <div>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
            />
          </div>

          <div>
            <label htmlFor="role">Rol</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} name="role">
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <button type="button" onClick={cancel}>
              <iconify-icon icon="mdi:close" />
              Cancelar
            </button>
            <button type="submit">
              <iconify-icon icon="mdi:content-save" />
              {isEdit ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
