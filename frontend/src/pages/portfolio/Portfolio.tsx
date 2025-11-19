import DashboardLayout from "../../layouts/DashBoardLayout";

export default function Portfolio() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Portafolio</h2>
        <p className="text-gray-600 mt-1">
          Muestra tus mejores trabajos y proyectos
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Tu Portafolio Profesional
          </h3>
          <p className="text-gray-600">
            Aquí podrás agregar y gestionar los proyectos que quieres mostrar a potenciales clientes.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}