"use client";
import { useState } from "react";
import TaskCard from "../../components/tasks/TaskCard";
import TaskFormModal from "../../components/tasks/TaskFormModal";
import type { Task, TaskFormData } from "./task.types";
import { TASK_STATUS_CONFIG } from "./task.constants";
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useProjects } from "../../hooks/projects/useProjects";

export default function Tasks() {
  // TODO: Obtener userId del contexto de autenticación real
  const userId = localStorage.getItem("userId") || "user123";

  // Cargar proyectos reales del backend usando el hook
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
    refetch: refetchProjects,
  } = useProjects(userId);

  // TODO: Implementar endpoint de requirements en el backend
  // Por ahora usamos datos de ejemplo
  const [requirements] = useState([
    {
      id: "req-1",
      description: "Implementar autenticación de usuarios",
      projectId: "cmhu4fxmt0002baqodzmdu28j", // Usar IDs reales del backend
    },
    {
      id: "req-2",
      description: "Diseñar página de productos",
      projectId: "cmhu4fxmt0002baqodzmdu28j",
    },
    {
      id: "req-3",
      description: "Crear sistema de notificaciones",
      projectId: "cmhu4fxmt0002baqodzmdu28j",
    },
  ]);

  // TODO: Conectar con el backend de tareas (GET /tasks)
  const [tasks, setTasks] = useState<Task[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    status: "TODO",
    imageUrl: "",
    projectId: "",
    requirementId: "",
  });

  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Crear nueva tarea
  const handleCreate = () => {
    const selectedProject = projects.find((p) => p.id === formData.projectId);
    const selectedRequirement = requirements.find(
      (r) => r.id === formData.requirementId
    );

    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      project: selectedProject
        ? { id: selectedProject.id, name: selectedProject.name }
        : undefined,
      requirement: selectedRequirement,
    };

    // TODO: Hacer POST al backend /tasks
    console.log("Creating task:", newTask);
    setTasks([...tasks, newTask]);
    resetForm();
  };

  const handleUpdate = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: formData.status,
              imageUrl: formData.imageUrl,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
    // TODO: Hacer PATCH al backend /tasks/:id
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      setTasks(tasks.filter((task) => task.id !== id));
      // TODO: Hacer DELETE al backend /tasks/:id
    }
  };

  const handleStatusChange = (id: string, status: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      )
    );
    // TODO: Hacer PATCH al backend /tasks/:id con el nuevo status
  };

  const openEditModal = (task: Task) => {
    setEditingId(task.id);
    setFormData({
      status: task.status,
      imageUrl: task.imageUrl,
      projectId: task.projectId,
      requirementId: task.requirementId,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      status: "TODO",
      imageUrl: "",
      projectId: "",
      requirementId: "",
    });
  };

  const handleFormChange = (data: Partial<TaskFormData>) => {
    setFormData({ ...formData, ...data });
  };

  const filteredTasks =
    filterStatus === "ALL"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const taskCounts = {
    ALL: tasks.length,
    TODO: tasks.filter((t) => t.status === "TODO").length,
    INPROGRESS: tasks.filter((t) => t.status === "INPROGRESS").length,
    DONE: tasks.filter((t) => t.status === "DONE").length,
  };

  // Convertir proyectos del backend al formato que espera el componente
  const projectsForDropdown = projects.map((p) => ({
    id: p.id,
    name: p.name,
  }));

  return (
    <DashboardLayout>
      <div>
        {/* Header específico de la página de tareas */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Tareas
            </h1>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-cyan-400 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition font-medium shadow-md flex items-center gap-2"
              disabled={projectsLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Nueva Tarea
            </button>
          </div>

          {/* Mensaje de error si falla la carga de proyectos */}
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

          {/* Filtros y estadísticas */}
          <div className="bg-base-200 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Filtrar por estado
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterStatus("ALL")}
                className={`btn btn-sm ${
                  filterStatus === "ALL" ? "btn-primary" : "btn-outline"
                }`}
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
        </div>

        {/* Lista de tareas */}
        <ul className="list bg-base-200 rounded-box shadow-md">
          {/* Header de la lista */}
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
              onEdit={openEditModal}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </ul>

        {/* Mensaje si no hay tareas */}
        {filteredTasks.length === 0 && (
          <div className="bg-base-200 border-2  border-dashed border-slate-300 rounded-lg p-12 text-center">
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
                ? "No tienes tareas aún"
                : `No hay tareas con estado "${
                    TASK_STATUS_CONFIG[
                      filterStatus as keyof typeof TASK_STATUS_CONFIG
                    ]?.label
                  }"`}
            </h3>
            <p className="text-slate-600 mb-4">
              {filterStatus === "ALL"
                ? "Crea tu primera tarea para comenzar"
                : "Prueba con otro filtro o crea una nueva tarea"}
            </p>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="btn btn-primary bg-cyan-400 hover:bg-cyan-500 border-cyan-400 text-white"
              disabled={projectsLoading}
            >
              Crear Tarea
            </button>
          </div>
        )}

        {/* Modal de formulario */}
        <TaskFormModal
          isOpen={showModal}
          isEditing={!!editingId}
          formData={formData}
          projects={projectsForDropdown}
          requirements={requirements}
          onClose={resetForm}
          onSubmit={() =>
            editingId ? handleUpdate(editingId) : handleCreate()
          }
          onChange={handleFormChange}
        />
      </div>
    </DashboardLayout>
  );
}
