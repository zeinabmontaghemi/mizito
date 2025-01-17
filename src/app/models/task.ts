// task.model.ts
export interface Task {
  id: number;
  title: string;
  description: string;
  progressPercentage: number;
  dueDate: string;
  taskPriority: number;
  createdAt: string;
  updatedAt: string;
  project: Project;
}

// project.model.ts
export interface Project {
  id: number;
  name: string;
  team: {
    id: number;
  };
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
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
