export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export const ROLES = ['admin', 'user', 'manager'] as const;
export type Role = (typeof ROLES)[number];
