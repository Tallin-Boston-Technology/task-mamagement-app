import { useState, useEffect } from "react";
import type { Task, UseFetchTasksReturn } from "../types/Task";

function useFetchTasks(): UseFetchTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();

        const transformedTasks: Task[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
        }));

        setTasks(transformedTasks);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, setTasks, loading, error };
}

export default useFetchTasks;
