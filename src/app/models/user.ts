import { Project } from './task';
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

export interface Team {
  id: number;
  name: string;
  description: string;
  projects: Project[];
  members: User[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrUpdateTeam {
  name: string;
  description: string;
}
