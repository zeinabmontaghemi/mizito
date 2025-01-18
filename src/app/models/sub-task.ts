export interface SubTask {
  id: number;
  taskId: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrUpdateSubTask {
  title: string;
  isCompleted: boolean;
}
