import type { FC } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: JSX.Element;
  background: string;
  onClick: string;
  navigate: (path: string) => void;
}

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  background,
  onClick,
  navigate,
}) => {
  return (
    <div
      className={`stats shadow-xl ${background} text-white hover:scale-105 transition-transform cursor-pointer`}
      onClick={() => navigate(onClick)}
    >
      <div className="stat">
        <div className="stat-figure text-white/50">{icon}</div>
        <div className="stat-title text-white/80">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-desc text-white/80">{description}</div>
      </div>
    </div>
  );
};

export default StatCard;
