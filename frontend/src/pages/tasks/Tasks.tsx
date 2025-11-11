"use client";
import { useState, useEffect } from "react";
import TaskCard from "../../components/tasks/TaskCard";
import TaskFormModal from "../../components/tasks/TaskFormModal";
import type { Task, TaskFormData } from "./task.types";
import { TASK_STATUS_CONFIG } from "./task.constants";
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useTasks } from "../../hooks/useTasks";

export default function Tasks() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const { tasks, loading, error, loadTasks, updateTaskStatus, uploadTaskImage } = useTasks();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    status: "TODO",
    imageUrl: "",
    projectId: "",
    requirementId: "",
  });

  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    if (selectedProjectId) {
      loadTasks(selectedProjectId);
    }
  }, [selectedProjectId]);

  const handleStatusChange = async (id: string, status: Task["status"]) => {
    try {
      await updateTaskStatus(id, status);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleImageUpload = async (taskId: string, file: File) => {
    try {
      await uploadTaskImage(taskId, file);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleCreate = () => {
    console.log('Create task:', formData);
    resetForm();
  };

  const handleUpdate = (id: string) => {
    console.log('Update task:', id, formData);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      console.log('Delete task:', id);
    }
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

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Tareas
            </h1>
          </div>

          <div className="bg-base-200 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Seleccionar Proyecto
            </h2>
            <input
              type="text"
              placeholder="Ingresa el ID del proyecto"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="input input-bordered w-full max-w-md"
            />
            <p className="text-sm text-gray-400 mt-2">
              Las tareas se generan automáticamente desde requerimientos aprobados
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

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

        {loading && (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="ml-2 text-white">Cargando tareas desde backend...</span>
          </div>
        )}

        {!loading && selectedProjectId && (
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

            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onImageUpload={handleImageUpload}
              />
            ))}
          </ul>
        )}

        {!loading && selectedProjectId && filteredTasks.length === 0 && (
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-slate-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
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
                ? "Las tareas se generan automáticamente cuando los requerimientos son aprobados"
                : "Prueba con otro filtro"}
            </p>
          </div>
        )}

        {!selectedProjectId && !loading && (
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-slate-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Selecciona un proyecto
            </h3>
            <p className="text-slate-600">
              Ingresa el ID de un proyecto para ver sus tareas
            </p>
          </div>
        )}

        {showModal && (
          <TaskFormModal
            isOpen={showModal}
            isEditing={!!editingId}
            formData={formData}
            projects={[]}
            requirements={[]}
            onClose={resetForm}
            onSubmit={() =>
              editingId ? handleUpdate(editingId) : handleCreate()
            }
            onChange={handleFormChange}
          />
        )}
      </div>
    </DashboardLayout>
  );
}