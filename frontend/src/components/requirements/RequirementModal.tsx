interface RequirementModalProps {
  isOpen: boolean;
  isEditing: boolean;
  description: string;
  onClose: () => void;
  onSave: () => void;
  onChange: (value: string) => void;
}

export default function RequirementModal({
  isOpen,
  isEditing,
  description,
  onClose,
  onSave,
  onChange,
}: RequirementModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-200">
        <h3 className="font-bold text-lg mb-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-pen-line-icon lucide-pen-line"
          >
            <path d="M13 21h8" />
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          </svg>
          {isEditing ? "Editar Requisito" : "Nuevo Requisito"}
        </h3>
        <div className="py-4">
          <label className="label">
            <span className="label-text font-medium text-white">
              Descripción del requisito
            </span>
          </label>
          <textarea
            placeholder="Describe qué se necesita hacer..."
            className="textarea textarea-bordered w-full h-32 text-gray-500"
            value={description}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-error">
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="btn btn-primary"
            disabled={!description.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-file-check-icon lucide-file-check"
            >
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
              <path d="M14 2v5a1 1 0 0 0 1 1h5" />
              <path d="m9 15 2 2 4-4" />
            </svg>
            {isEditing ? "Guardar" : "Crear"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
