import { useState, useEffect } from 'react';
import { taskService, type TaskResponse } from '../services/task.service';
import type { Task, TaskStatus } from '../pages/tasks/task.types';

export const useTasks = (projectId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformTask = (taskResponse: TaskResponse): Task => ({
    id: taskResponse.id,
    status: taskResponse.status,
    imageUrl: taskResponse.imageUrl,
    createdAt: taskResponse.createdAt,
    updatedAt: taskResponse.updatedAt,
    projectId: taskResponse.projectId,
    requirementId: taskResponse.requirementId,
    requirement: {
      id: taskResponse.requirementId,
      description: taskResponse.requirement.description,
    },
  });

  const loadTasks = async (projectId: string) => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await taskService.getTasksByProject(projectId);
      const transformedTasks = response.map(transformTask);
      setTasks(transformedTasks);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setTasks([]);
      } else {
        setError(err instanceof Error ? err.message : 'Error al cargar las tareas');
        console.error('Error loading tasks:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, status);
      const transformedTask = transformTask(updatedTask);
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? transformedTask : task
        )
      );
      
      return transformedTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la tarea');
      throw err;
    }
  };

  const uploadTaskImage = async (taskId: string, file: File) => {
    try {
      const updatedTask = await taskService.uploadTaskImage(taskId, file);
      const transformedTask = transformTask(updatedTask);
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? transformedTask : task
        )
      );
      
      return transformedTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir la imagen');
      throw err;
    }
  };

  useEffect(() => {
    if (projectId) {
      loadTasks(projectId);
    }
  }, [projectId]);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    updateTaskStatus,
    uploadTaskImage,
    setError,
  };
};