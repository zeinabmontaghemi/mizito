// task.model.ts
import { User } from './user';

export interface Task {
  id: number;
  title: string;
  description: string;
  progressPercentage: number;
  dueDate: string;
  taskPriority: number;
  projectId: number;
  responsibles: Responsible[];
  createdAt: string;
  updatedAt: string;
}

export interface Responsible {
  id: number;
  username: string;
  password: string;
  email: string;
  userRole: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface Project {
  id: number;
  name: string;
  teamId: number;
  members: User[];
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

export interface CreateOrUpdateTask {
  title: string;
  description: string;
  progressPercentage: number;
  dueDate: string;
  taskPriority: number;
}

export interface CreateTask {
  title: string;
  description: string;
  progressPercentage: number;
  dueDate: string;
  taskPriority: number;
}

export interface GetTasksResponse {
  tasks: Task[];
}
