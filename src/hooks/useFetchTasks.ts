import { useState, useEffect } from "react";
import type { Task, UseFetchTasksReturn } from "../types/Task";
import taskService from "../api/taskService";

function useFetchTasks(): UseFetchTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const fetchedTasks = await taskService.getTasks(5);
        setTasks(fetchedTasks);
      } catch (err) {
        const errMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, setTasks, loading, error };
}

export default useFetchTasks;
