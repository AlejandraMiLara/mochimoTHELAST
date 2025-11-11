import { useState, useEffect } from "react";
import { taskService, type TaskResponse } from "../services/task.service";
import type { TaskStatus } from "../pages/tasks/task.types";

export function useTasks(projectId: string | null) {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    if (!projectId) {
      setTasks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await taskService.getTasksByProject(projectId);
      setTasks(data);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Error al cargar las tareas";
      setError(errorMsg);
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, status);
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Error al actualizar el estado";
      throw new Error(errorMsg);
    }
  };

  const uploadTaskImage = async (taskId: string, file: File) => {
    try {
      const updatedTask = await taskService.uploadTaskImage(taskId, file);
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Error al subir la imagen";
      throw new Error(errorMsg);
    }
  };

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
    updateTaskStatus,
    uploadTaskImage,
  };
}
