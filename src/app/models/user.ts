// user.model.ts
export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  userRole: string; // e.g., 'ROLE_ADMIN'
  createdAt: string;
  updatedAt: string;
  active: boolean;
  imageUrl: string;
}
