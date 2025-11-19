import type { FC } from "react";
import { getIcon } from "../../utils/icons";

interface ActionConfig {
  label: string;
  path: string;
  icon: string;
  variant: string;
  gradient?: string;
  span?: number;
}

interface QuickActionsProps {
  actions: ActionConfig[];
  navigate: (path: string) => void;
  theme: "cyan" | "purple";
}

const QuickActions: FC<QuickActionsProps> = ({ actions, navigate, theme }) => {
  const getButtonClass = (variant: string, gradient?: string) => {
    if (variant === "primary") {
      return `btn btn-primary bg-gradient-to-r ${gradient} border-none hover:opacity-90 text-white shadow-lg justify-start`;
    }
    if (variant === "outline-secondary") {
      return `btn btn-outline btn-secondary hover:bg-${
        theme === "cyan" ? "purple" : "purple"
      }-50 justify-start`;
    }
    return `btn btn-outline btn-primary hover:bg-${theme}-50 justify-start`;
  };

  return (
    <div className="lg:col-span-2 card bg-base-200 shadow-xl border border-gray-300">
      <div className="card-body">
        <h3 className="card-title text-white flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="blue"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-zap-icon lucide-zap"
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
          </svg>
          Acciones Rápidas
        </h3>
        <div className="divider my-2"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`${getButtonClass(action.variant, action.gradient)} ${
                action.span ? `md:col-span-${action.span}` : ""
              }`}
            >
              {getIcon(action.icon)}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
