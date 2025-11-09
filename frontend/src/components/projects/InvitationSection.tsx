// src/components/projects/InvitationSection.tsx
import { useState } from "react";
import type { Project } from "../../pages/project/project.types";

interface InvitationSectionProps {
  projects: Project[];
  userInvitationCodes: string[];
  onJoinSuccess: (code: string) => void;
}

export default function InvitationSection({
  projects,
  userInvitationCodes,
  onJoinSuccess,
}: InvitationSectionProps) {
  const [invitationCode, setInvitationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleJoinProject = () => {
    setError("");
    setSuccess("");

    if (!invitationCode.trim()) {
      setError("Por favor ingresa un código de invitación");
      return;
    }

    // TODO: POST /projects/join con { invitationCode }
    const projectToJoin = projects.find(
      (p) => p.invitationCode === invitationCode.trim()
    );

    if (!projectToJoin) {
      setError("Código de invitación inválido o proyecto no encontrado");
      return;
    }

    if (userInvitationCodes.includes(invitationCode.trim())) {
      setError("Ya estás unido a este proyecto");
      return;
    }

    // Notificar exito al componente padre
    onJoinSuccess(invitationCode.trim());
    setSuccess(
      `¡Te has unido exitosamente al proyecto "${projectToJoin.name}"!`
    );
    setInvitationCode("");

    // Limpiar mensaje despues de 5 segundos
    setTimeout(() => setSuccess(""), 5000);
  };

  return (
    <div className="bg-base-100 from-cyan-50 to-blue-50 border-2 border-white rounded-lg p-6 mb-8 shadow-md">
      <div className="flex items-start gap-4">
        <div className="bg-cyan-400 p-3 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">
            Únete a un Proyecto
          </h3>
          <p className="text-white mb-4">
            ¿Tienes un código de invitación? Ingresalo aquí para unirte a un
            proyecto
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleJoinProject()}
              placeholder="Ingresa el código de invitación"
              className="input input-bordered flex-1 bg-white"
            />
            <button
              onClick={handleJoinProject}
              className="btn bg-cyan-400 hover:bg-cyan-500 text-white border-cyan-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              Unirse
            </button>
          </div>

          {/* Mensajes de error y exito */}
          {error && (
            <div className="alert alert-error mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{success}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
