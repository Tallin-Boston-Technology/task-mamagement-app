import { Task } from "../types/Task";
import axiosInstance from "./axios";

interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const taskService = {
  // get all
  getTasks: async (limit: number = 5): Promise<Task[]> => {
    try {
      const response = await axiosInstance.get<ApiTodo[]>(
        `/todos?_limit=${limit}`
      );
      return response.data.map((item) => ({
        id: item.id,
        title: item.title,
        completed: item.completed,
      }));
    } catch (error) {
      throw new Error("Failed to fetch task");
    }
  },

  // get by id
  getTaskById: async (id: number): Promise<Task> => {
    try {
      const response = await axiosInstance.get<ApiTodo>(`/todos/${id}`);
      return {
        id: response.data.id,
        title: response.data.title,
        completed: response.data.completed,
      };
    } catch (error) {
      throw new Error(`Failed to fetch task with id ${id}`);
    }
  },

  // create new task
  createTask: async (task: Omit<Task, "id">): Promise<Task> => {
    try {
      const response = await axiosInstance.post<ApiTodo>(`/todos`, {
        title: task.title,
        completed: task.completed,
        userId: 1,
      });
      return {
        id: response.data.id,
        title: response.data.title,
        completed: response.data.completed,
      };
    } catch (error) {
      throw new Error("Failed to create new task");
    }
  },

  // update task
  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    try {
      const response = await axiosInstance.put<ApiTodo>(`/todos/${id}`, {
        ...task,
        userId: 1,
      });
      return {
        id: response.data.id,
        title: response.data.title,
        completed: response.data.completed,
      };
    } catch (error) {
      throw new Error(`Failed to update task with id ${id}`);
    }
  },

  // patch task
  patchTask: async (id: number, update: Partial<Task>): Promise<Task> => {
    try {
      const response = await axiosInstance.patch<ApiTodo>(
        `/todos/${id}`,
        update
      );
      return {
        id: response.data.id,
        title: response.data.title,
        completed: response.data.completed,
      };
    } catch (error) {
      throw new Error(`Failed to Patch task with id ${id}`);
    }
  },

  // delete task
  deleteTask: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
    } catch (error) {
      throw new Error(`Failed to deleted from task id ${id}`);
    }
  },
};

export default taskService;
