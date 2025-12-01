"use client";
import { useState } from "react";
import TaskCard from "../../components/tasks/TaskCard";
import type { TaskStatus } from "./task.types";
import { TASK_STATUS_CONFIG } from "./task.constants";
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useProjects } from "../../hooks/projects/useProjects";
import { useTasks } from "../../hooks/useTasks";

export default function Tasks() {
  const userId = localStorage.getItem("userId") || "user123";

  // Estado para el proyecto seleccionado y filtro de estado
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Cargar proyectos del backend
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
    refetch: refetchProjects,
  } = useProjects(userId);

  // Cargar tareas segun el proyecto seleccionado
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
    updateTaskStatus,
    uploadTaskImage,
  } = useTasks(selectedProjectId || null);

  // Cambiar estado de tarea
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateTaskStatus(id, status as TaskStatus);
    } catch (err: any) {
      alert(
        err.message || "Error al cambiar el estado. Por favor intenta de nuevo."
      );
    }
  };

  // Subir imagen de evidencia
  const handleImageUpload = async (taskId: string, file: File) => {
    try {
      await uploadTaskImage(taskId, file);
    } catch (err: any) {
      alert(
        err.message || "Error al subir la imagen. Por favor intenta de nuevo."
      );
    }
  };

  // Filtrar tareas por estado
  const filteredTasks =
    filterStatus === "ALL"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  // Contar tareas por estado
  const taskCounts = {
    ALL: tasks.length,
    TODO: tasks.filter((t) => t.status === "TODO").length,
    INPROGRESS: tasks.filter((t) => t.status === "INPROGRESS").length,
    DONE: tasks.filter((t) => t.status === "DONE").length,
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Tareas</h1>
          </div>

          <div className="flex items-center bg-slate-800 gap-2 px-2 py-1 rounded-md text-xs text-blue-200">
            <svg
              className="h-3 w-3 opacity-70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Las tareas se generan automáticamente cuando un requerimiento es
            aprobado.
          </div>

          {projectsError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center justify-between">
              <div>
                <strong>Error:</strong> {projectsError}
              </div>
              <button
                onClick={() => refetchProjects()}
                className="btn btn-sm btn-outline"
              >
                Reintentar
              </button>
            </div>
          )}
          {/* Selector de proyecto */}
          <div className="bg-base-200 rounded-lg shadow-md p-6 mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Selecciona un proyecto
            </label>
            <select
              className="select select-bordered w-full max-w-md px-4 py-3 border border-white rounded-lg bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                setFilterStatus("ALL");
              }}
              disabled={projectsLoading}
            >
              <option className="bg-base-200" value="">
                {projectsLoading ? "Cargando..." : "Selecciona un proyecto"}
              </option>
              {projects.map((project) => (
                <option
                  className="bg-base-200"
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          {/* Filtros y estadisticas - solo si hay proyecto seleccionado */}
          {selectedProjectId && (
            <div className="bg-base-200 rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Filtrar por estado
                </h2>
                {tasksError && (
                  <button
                    onClick={() => refetchTasks()}
                    className="btn btn-sm btn-outline text-white"
                  >
                    Recargar tareas
                  </button>
                )}
              </div>

              {tasksError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <strong>Error:</strong> {tasksError}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFilterStatus("ALL")}
                  className={`btn btn-sm ${
                    filterStatus === "ALL" ? "btn-primary" : "btn-outline"
                  }`}
                  disabled={tasksLoading}
                >
                  Todas ({taskCounts.ALL})
                </button>
                {Object.entries(TASK_STATUS_CONFIG).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setFilterStatus(key)}
                    className={`btn btn-sm text-white ${
                      filterStatus === key ? "btn-primary" : "btn-outline"
                    }`}
                    disabled={tasksLoading}
                  >
                    <span
                      className={`badge ${config.color} badge-sm mr-2`}
                    ></span>
                    {config.label} (
                    {taskCounts[key as keyof typeof taskCounts] || 0})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lista de tareas - solo si hay proyecto seleccionado */}
        {selectedProjectId && (
          <>
            {tasksLoading ? (
              <div className="bg-base-200 rounded-lg shadow-md p-12 text-center">
                <div className="loading loading-spinner loading-lg text-cyan-500"></div>
                <p className="text-white mt-4">Cargando tareas...</p>
              </div>
            ) : (
              <>
                <ul className="list bg-base-200 rounded-box shadow-md">
                  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide uppercase text-white">
                    {filterStatus === "ALL"
                      ? `Todas las tareas (${filteredTasks.length})`
                      : `${
                          TASK_STATUS_CONFIG[
                            filterStatus as keyof typeof TASK_STATUS_CONFIG
                          ]?.label
                        } (${filteredTasks.length})`}
                  </li>

                  {/* Tareas */}
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      {...task}
                      onStatusChange={handleStatusChange}
                      onImageUpload={handleImageUpload}
                    />
                  ))}
                </ul>

                {filteredTasks.length === 0 && (
                  <div className="bg-base-200 border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-16 w-16 text-slate-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {filterStatus === "ALL"
                        ? "No hay tareas en este proyecto"
                        : `No hay tareas con estado "${
                            TASK_STATUS_CONFIG[
                              filterStatus as keyof typeof TASK_STATUS_CONFIG
                            ]?.label
                          }"`}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {filterStatus === "ALL"
                        ? "Las tareas se crean automáticamente cuando se aprueban los requerimientos"
                        : "Prueba con otro filtro"}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {!selectedProjectId && (
          <div className="bg-base-200 rounded-lg p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-slate-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">
              Selecciona un proyecto
            </h3>
            <p className="text-slate-600">
              Elige un proyecto arriba para ver sus tareas
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
