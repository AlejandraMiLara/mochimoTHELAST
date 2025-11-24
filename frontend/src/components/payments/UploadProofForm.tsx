import { useState } from "react";

interface UploadProofFormProps {
  onSubmit: (file: File) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export default function UploadProofForm({
  onSubmit,
  onCancel,
  loading,
}: UploadProofFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("El archivo es demasiado grande (Máximo 5MB)");
        e.target.value = "";
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      await onSubmit(file);
    }
  };

  return (
    <div className="bg-base-200 rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-white mb-4">
        Subir Comprobante de Pago
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Selecciona una imagen del comprobante
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {preview && (
          <div className="border rounded-lg p-4">
            <p className="text-sm text-white mb-2">Vista previa:</p>
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg shadow-sm"
            />
          </div>
        )}

        <div className="bg-base-200 border border-base-200 rounded-lg p-4">
          <p className="text-sm text-white">
            <strong>Nota:</strong> Asegúrate de que el comprobante sea legible y
            contenga toda la información necesaria del pago realizado.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || !file}
            className="flex-1 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-400 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Subiendo...
              </>
            ) : (
              "Subir Comprobante"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
