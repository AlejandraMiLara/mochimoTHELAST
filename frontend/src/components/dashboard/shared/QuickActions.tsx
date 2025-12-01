import type { FC } from "react";

interface ActionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
}

interface QuickActionsProps {
  actions: ActionItem[];
  navigate: (path: string) => void;
  title: string;
  icon: React.ReactNode;
}

export const QuickActions: FC<QuickActionsProps> = ({
  actions,
  navigate,
  title,
  icon,
}) => {
  return (
    <div className="lg:col-span-2 bg-base-100 rounded-2xl p-6 border border-base-300 shadow-xl backdrop-blur-sm">
      <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
        <span className="text-primary">{icon}</span> {title}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={() => navigate(action.path)}
            className={`${action.color} rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:bg-base-200 border backdrop-blur-sm`}
          >
            <div className="text-2xl mb-2 text-base-content/70">
              {action.icon}
            </div>
            <div className="font-medium text-base-content">{action.title}</div>
            <div className="text-sm text-base-content/70 mt-1">
              {action.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
