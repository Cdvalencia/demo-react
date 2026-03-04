import type { User } from '../types/user';

const STORAGE_KEY = 'esqueleto_users';

function createSeedUsers(): User[] {
  return [
    { id: crypto.randomUUID(), name: 'Alice Admin', email: 'alice@example.com', phone: '+57 300 111 0001', role: 'admin' },
    { id: crypto.randomUUID(), name: 'Bob User', email: 'bob@example.com', phone: '+57 300 222 0002', role: 'user' },
    { id: crypto.randomUUID(), name: 'Carol Manager', email: 'carol@example.com', phone: '+57 300 333 0003', role: 'manager' },
  ];
}

function loadFromStorage(): User[] | undefined {
  if (typeof window === 'undefined') return undefined;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw == null) return undefined;
  try {
    return JSON.parse(raw) as User[];
  } catch {
    return undefined;
  }
}

function saveToStorage(users: User[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUsers(): User[] {
  const stored = loadFromStorage();
  if (stored === undefined) {
    const seed = createSeedUsers();
    saveToStorage(seed);
    return [...seed];
  }
  return stored;
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function createUser(user: Omit<User, 'id'>): User {
  const newUser: User = { ...user, id: crypto.randomUUID() };
  const list = getUsers();
  list.push(newUser);
  saveToStorage(list);
  return newUser;
}

export function updateUser(user: User): void {
  const list = getUsers();
  const idx = list.findIndex((u) => u.id === user.id);
  if (idx !== -1) {
    list[idx] = user;
    saveToStorage(list);
  }
}

export function deleteUser(id: string): void {
  const list = getUsers().filter((u) => u.id !== id);
  saveToStorage(list);
}
