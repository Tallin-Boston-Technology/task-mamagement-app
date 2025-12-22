export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface UseFetchTasksReturn {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  loading: boolean;
  error: string | null;
}
