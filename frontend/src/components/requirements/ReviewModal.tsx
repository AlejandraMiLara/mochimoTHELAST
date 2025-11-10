import { useState } from "react";
import type { Requirement } from "../../hooks/Requirements/useRequirements";

interface ReviewModalProps {
  isOpen: boolean;
  requirements: Requirement[];
  onClose: () => void;
  onReview: (action: "APPROVE" | "REVISION", reason?: string) => void;
}

export default function ReviewModal({
  isOpen,
  requirements,
  onClose,
  onReview,
}: ReviewModalProps) {
  const [reviewAction, setReviewAction] = useState<"APPROVE" | "REVISION">(
    "APPROVE"
  );
  const [revisionReason, setRevisionReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onReview(
      reviewAction,
      reviewAction === "REVISION" ? revisionReason : undefined
    );
    setRevisionReason("");
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">📋 Revisar Requisitos</h3>

        <div className="py-4 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Revisa los {requirements.length} requisitos definidos para el
              proyecto
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {requirements.map((req, index) => (
                <div key={req.id} className="p-3 bg-base-200 rounded-lg">
                  <p className="font-medium">
                    {index + 1}. {req.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="review"
                className="radio radio-success"
                checked={reviewAction === "APPROVE"}
                onChange={() => setReviewAction("APPROVE")}
              />
              <span className="label-text font-medium">
                ✅ Aprobar todos los requisitos
              </span>
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="review"
                className="radio radio-error"
                checked={reviewAction === "REVISION"}
                onChange={() => setReviewAction("REVISION")}
              />
              <span className="label-text font-medium">
                🔄 Solicitar revisión
              </span>
            </label>
          </div>

          {reviewAction === "REVISION" && (
            <div className="mt-4">
              <label className="label">
                <span className="label-text font-medium">
                  Motivo de la revisión
                </span>
              </label>
              <textarea
                placeholder="Explica qué necesita ser revisado..."
                className="textarea textarea-bordered w-full h-24"
                value={revisionReason}
                onChange={(e) => setRevisionReason(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className={`btn ${
              reviewAction === "APPROVE" ? "btn-success" : "btn-warning"
            }`}
            disabled={reviewAction === "REVISION" && !revisionReason.trim()}
          >
            {reviewAction === "APPROVE"
              ? "✅ Aprobar"
              : "🔄 Solicitar Revisión"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
